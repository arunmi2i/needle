import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api'
import { BreadcrumbService } from './service/breadcrumb.service';
import { NavigationService } from 'src/app/shared/navigations/navigation.service';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {

  subscription: Subscription;

  items: MenuItem[] = [];

  constructor(public breadcrumbService: BreadcrumbService, private navigation:NavigationService ) {
      this.subscription = this.breadcrumbService.itemsHandler.subscribe((response:any) => {
        console.log(response);
          this.items = response;
      });
  }

  navigateTo(path:any) {
    this.navigation.navigateTo(path);
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
