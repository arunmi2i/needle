import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/shared/storage/localstorage.service';
import { NavigationService } from 'src/app/shared/navigations/navigation.service';

const TOKEN_HEADER_KEY = 'apitoken';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage:LocalstorageService, private navigation: NavigationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    req.headers.append("Content-Type" , "application/json");
    const token = this.storage.fromStorage.get("apitoken");
    const location_id = this.storage.fromStorage.get("currentLocation");
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    } else {
      this.navigation.navigateTo("login");
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];