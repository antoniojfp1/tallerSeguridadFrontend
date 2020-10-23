import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Response } from './../shared/response'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = `${environment.server.host}:${environment.server.port}${environment.api.user}/`;

  constructor(private http: HttpClient) { }

  get(token: string): Observable<Response<User[]>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<Response<User[]>>(this.url, httpOptions);
  }

  post(user: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.url, user);
  }
}
