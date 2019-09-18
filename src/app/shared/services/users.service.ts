import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/User.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> { // todo fix here and put User
    return this.http.get(`http://localhost:3000/users?email=${email}`).pipe(
      // map((response: Response) => response.json()),
      map((user: User[]) => user[0] ? user[0] : undefined)
    );
  }
}
