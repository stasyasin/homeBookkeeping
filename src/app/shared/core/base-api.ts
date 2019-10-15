import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://35.232.61.12:3000/';
  // private baseUrl = 'http://localhost:3000/';
  // private baseUrl = 'https://my-json-server.typicode.com/stasyasin/homeBookeepingJson/';
  // private baseUrl = 'https://jsonstorage.net/api/items/33c131ab-a7af-4b2d-93d8-5baf3a155421/';
  // private baseUrl = 'https://api.jsonbin.io/b/5da2f4ee626bc47f463bbc66';
  constructor(public http: HttpClient) {}

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }
}
