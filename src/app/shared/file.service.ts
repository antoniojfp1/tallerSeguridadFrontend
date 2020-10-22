import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './../shared/response';
import { ByteFile } from './bite.file';
import { Keys } from './keys';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    URL_ENCRYPT_SERVICE = `http://localhost:8080/file/encrypt`;
    URL_DECRYPT_SERVICE = `http://localhost:8080/file/decrypt`;

    constructor(private http: HttpClient) { }

    post(formData, token: string, type: string): Observable<Response<ByteFile>> {
        const url = type === 'encrypt' ? `${this.URL_ENCRYPT_SERVICE}`  : `${this.URL_DECRYPT_SERVICE}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.post<Response<ByteFile>>(url, formData, httpOptions);
    }

    get(token: string): Observable<Response<Keys>> {
        const url = 'http://localhost:8080/signature/generateKeys';
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.get<Response<Keys>>(url, httpOptions);
    }

}
