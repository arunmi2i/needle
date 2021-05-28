import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './api/restapi.service';
import { PathSettings } from './globalpath.mock'

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor(private api:RestApiService, private path: PathSettings) { }

  login(request: any): Observable<any> {
    return this.api.post(this.path.login , request);
  }

  logout(): Observable<any> {
    return this.api.get(this.path.logout);
  }
  
  getUserDetailsByToken(request: any): Observable<any> {
    return this.api.post(this.path.useriInfoByToken, request);
  }

  getDashboardCards(request: any, subpath?: string): Observable<any> {
    return this.api.get(this.path.getDashboardCard + subpath, request);
  }

  getEvents(subpath?: string): Observable<any> {
    return this.api.get(this.path.getEvent + subpath);
  }

  getAnnouncements(subpath?: string): Observable<any> {
    return this.api.get(this.path.getAnnouncement + subpath);
  }
}
