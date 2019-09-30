import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'hb-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;
  currencies: string[] = ['UAH', 'USD'];

  constructor() { }

  ngOnInit() {
  }

}
