import { BaseApi } from '../../../shared/core/base-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HBEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: HBEvent): Observable<HBEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HBEvent[]> {
    return this.get('events');
  }
}
