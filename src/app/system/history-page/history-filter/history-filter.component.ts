import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [{ type: 'd', label: 'Day' }, { type: 'w', label: 'Week' }, { type: 'M', label: 'Month' }];

  types = [{ type: 'income', label: 'income' }, { type: 'outcome', label: 'outcome' }];

  closeFilter() {
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }

  handleChangeType({ checked, value }) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({ checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  applyFilter(event: Event) {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
