import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpOptions, HttpFileOptions } from '../models/httpOptions.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  async get(url: string , isFile: boolean): Promise<any> {
    let optionsToSend: HttpOptions = {};
    optionsToSend.headers = isFile ? this.getFileHeaders() : this.getDefaultHeaders();
    return this.httpClient.get(environment.BASE_URL + url, optionsToSend).toPromise();
  }

  async getFile(url: string): Promise<any> {
    let optionsToSend: HttpFileOptions = {};
    optionsToSend.headers = this.getFileHeaders();
    let headers = new HttpHeaders();
    headers = headers.append('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    return this.httpClient.get(environment.BASE_URL + url, {headers: headers, observe: 'response', responseType: 'blob'}).toPromise();
  }

  async post(url: string, data: any, isFile: boolean): Promise<any> {
    let optionsToSend: HttpOptions = {};
    optionsToSend.headers = isFile ? this.getFileHeaders() : this.getDefaultHeaders();
    return this.httpClient.post(environment.BASE_URL + url, data, optionsToSend).toPromise();
  }

  private getDefaultHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  private getFileHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/octet-stream'); //,application/vnd.ms-excel
    return headers;
  }
}

