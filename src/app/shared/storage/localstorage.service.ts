import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  toStorage: any = {
    set: (key: any, value: any) => {
      localStorage.setItem(key,value);
    }
  }

  fromStorage: any = {
    get: (key: any) => {
      return localStorage.getItem(key);
    }
  }

  clearStorage() {
    localStorage.clear();
  }
}
