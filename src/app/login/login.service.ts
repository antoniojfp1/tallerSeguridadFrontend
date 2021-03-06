import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Response } from './../shared/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  post(username: string, password: string): Observable<Response<Login>> {
    const url = `${environment.server.host}:${environment.server.port}${environment.api.login}`;
    var data = `grant_type=password&username=${username}&password=${password}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Response<Login>>(url, data, httpOptions);
  }
}
