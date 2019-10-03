import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { HBEvent } from '../../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input()
  categories: Category[] = [];
  types = [{ type: 'income', label: 'income' }, { type: 'outcome', label: 'outcome' }];

  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const { description, category, type } = form.value;
    const amount = form.value.amount < 0 ? form.value.amount * -1 : form.value.amount;
    const date = moment().format('DD.MM.YYYY HH:mm:ss');
    const event = new HBEvent(type, amount, +category, date, description);
  }
}
