import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from './../shared/response';
import { ByteFile } from './bite.file';
import { Keys } from './keys';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    URL_ENCRYPT_AES_SERVICE = `${environment.server.host}:${environment.server.port}${environment.api.file}/encrypt`;
    URL_DECRYPT_AES_SERVICE = `${environment.server.host}:${environment.server.port}${environment.api.file}/decrypt`;
    URL_ENCRYPT_RSA_SERVICE = `${environment.server.host}:${environment.server.port}${environment.api.signature}/encryptWithKey`;
    URL_DECRYPT_RSA_SERVICE = `${environment.server.host}:${environment.server.port}${environment.api.signature}/decryptWithKey`;

    constructor(private http: HttpClient) { }

    post(formData, token: string, type: string, method: string): Observable<Response<ByteFile>> {
        let url = '';
        if (type === 'AES') {
            url = method === 'encrypt' ? `${this.URL_ENCRYPT_AES_SERVICE}`  : `${this.URL_DECRYPT_AES_SERVICE}`;
        } else {
            url = method === 'encrypt' ? `${this.URL_ENCRYPT_RSA_SERVICE}`  : `${this.URL_DECRYPT_RSA_SERVICE}`;
        }
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.post<Response<ByteFile>>(url, formData, httpOptions);
    }

    get(token: string): Observable<Response<Keys>> {
        const url = `${environment.server.host}:${environment.server.port}${environment.api.signature}/generateKeys`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': token
            })
        };
        return this.http.get<Response<Keys>>(url, httpOptions);
    }

}
