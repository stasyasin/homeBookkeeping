import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { HBEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input()
  categories: Category[] = [];
  types = [{ type: 'income', label: 'income' }, { type: 'outcome', label: 'outcome' }];
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private eventsService: EventsService, private billService: BillService) {}

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(form: NgForm) {
    const { description, category, type } = form.value;
    const amount = form.value.amount < 0 ? form.value.amount * -1 : form.value.amount;
    const date = moment().format('DD.MM.YYYY HH:mm:ss');
    const event = new HBEvent(type, amount, +category, date, description);
    this.sub1 = this.billService.getBill().subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(`You don't have a sufficient amount. ${amount - bill.value} missed`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }
      this.sub2 = this.billService.updateBill({ value, currency: bill.currency }).subscribe(() => {
        this.eventsService.addEvent(event).subscribe();
        form.setValue({
          amount: 0,
          description: '',
          category: 1,
          type: 'outcome'
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
