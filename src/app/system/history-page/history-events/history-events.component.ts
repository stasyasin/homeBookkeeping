import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { HBEvent } from '../../shared/models/event.model';

@Component({
  selector: 'hb-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input()
  categories: Category[] = [];
  @Input()
  events: HBEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Sum';
  searchField = 'amount';
  namesMap = {
    amount: 'Sum',
    date: 'Date',
    category: 'Category',
    type: 'Type'
  };

  constructor() {}

  ngOnInit() {
    this.events.forEach(e => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(event: HBEvent) {
    return {
      label: true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    };
  }

  changeCriteria(field: string) {
    this.searchPlaceholder = this.namesMap[field];
    this.searchField = field;
  }
}
