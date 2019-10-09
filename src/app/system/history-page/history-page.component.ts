import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { HBEvent } from '../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'hb-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  categories: Category[] = [];
  events: HBEvent[] = [];
  filteredEvents: HBEvent[] = [];
  sub1: Subscription;
  chartData = [];
  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) {}

  ngOnInit() {
    this.sub1 = combineLatest(this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
      (data: [Category[], HBEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      }
    );
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private calculateChartData() {
    this.chartData = [];
    this.categories.forEach(cat => {
      const catEvents = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisiability(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisiability(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisiability(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.filteredEvents = this.filteredEvents
      .filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter(e => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisiability(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
