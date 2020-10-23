import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Response } from './../shared/response'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  get(token: string): Observable<Response<User[]>> {
    const url = `http://142.93.193.186:8080/user/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<Response<User[]>>(url, httpOptions);
  }

  post(user: User): Observable<Response<User>> {
    const url = `http://142.93.193.186:8080/user/`;
    return this.http.post<Response<User>>(url, user);
  }
}
