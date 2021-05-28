import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/breadcrumb/service/breadcrumb.service';
import { LocalstorageService } from '../storage/localstorage.service';
import { _navigation } from './routes.mock';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router,private navPath: _navigation, private breadcrumb:BreadcrumbService, private storage:LocalstorageService) { }

  navigateTo (path:any) {
    this.setBroadCrumbOnNavigation(path);
    this.storage.toStorage.set("currentState",path);
    this.router.navigate([this.navPath.url[path]]);
  }

  setBroadCrumbOnNavigation(path:any) {
    if (path == "dashboard") {
      this.breadcrumb.setItems([
        { label: 'Home' },
        { label: 'Dashboard'}
      ]);
    } else if (path == "course") {
      this.breadcrumb.setItems([
        { label: 'Home' , routerLink: ['dashboard']},
        { label: 'Course'}
      ]);
    } else if (path == "schedule") {
      this.breadcrumb.setItems([
        { label: 'Home' , routerLink: ['dashboard']},
        { label: 'Schedule'}
      ]);
    } else if (path == "event") {
      this.breadcrumb.setItems([
        { label: 'Home' , routerLink: ['dashboard']},
        { label: 'Event'}
      ]);
    } else if (path == "announcement") {
      this.breadcrumb.setItems([
        { label: 'Home' , routerLink: ['dashboard']},
        { label: 'Announcement'}
      ]);
    }
  }
}
