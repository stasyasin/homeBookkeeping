import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  accessKey = 'e3bbdbb89ff2e65d7626e65a57333ee2';
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get(`bill`).pipe(map((bill: Bill) => bill));
  }

  getCurrency(base: string = 'EUR'): Observable<any> {
    // return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.accessKey}`); // // not possible to use https on basic fixer subscription, when use http -> firebase provides some console error
    // return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`); // good rest api, but no UAH
    return this.http.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
