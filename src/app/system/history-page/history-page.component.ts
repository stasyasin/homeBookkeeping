import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { HBEvent } from '../shared/models/event.model';

@Component({
  selector: 'hb-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  categories: Category[] = [];
  events: HBEvent[] = [];
  sub1: Subscription;
  chartData = [];
  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) {}

  ngOnInit() {
    this.sub1 = combineLatest(this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
      (data: [Category[], HBEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.calculateChartData();
        this.isLoaded = true;
      }
    );
  }

  private calculateChartData() {
    this.chartData = [];
    this.categories.forEach(cat => {
      const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
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
    console.log(filterData);

  }

  onFilterCancel() {
    this.toggleFilterVisiability(false);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
