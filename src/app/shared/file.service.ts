import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './../shared/response';
import { ByteFile } from './bite.file';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    post(formData, token: string): Observable<Response<ByteFile>> {
        const url = `http://localhost:8080/file/encrypt`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.post<Response<ByteFile>>(url, formData, httpOptions);
    }

}