import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { HBEvent } from '../shared/models/event.model';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'hb-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HBEvent[] = [];
  sub1: Subscription;
  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], HBEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  getCategoryPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCosts(cat) / cat.capacity);
    return percent > 100 ? 100: percent;
  }

  getCategoryCosts(cat: Category): number {
    const catEvents: HBEvent[] = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
