import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';

@Injectable()
export class BillService {
  accessKey = 'e3bbdbb89ff2e65d7626e65a57333ee2';
  constructor(private http: HttpClient) {}

  getBill(): Observable<Bill> {
    return this.http.get(`http://localhost:3000/bill`).pipe(
      map((bill: Bill) => bill)
    );
  }

  getCurrency(base: string = 'UAH'): Observable<any> {
    // const temp = this.http.get(`http://data.fixer.io/api/latest?access_key=${this.accessKey}`);
    // console.log(temp);
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.accessKey}`);
  }
}
