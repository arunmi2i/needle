import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_HOST = environment.API_HOST;

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  post(path: string, requestData: any = "") {
    return this.http.post(API_HOST + path, requestData);
  }

  get(path: string, requestData: any = "") {
    return this.http.get(API_HOST + path, requestData);
  }

}
