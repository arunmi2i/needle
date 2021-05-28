import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from '../services/menu.service';
import { AppMainComponent } from 'src/app/modules/home/app.main.component';
import { SessionService } from 'src/app/shared/session/session.service';
import { NavigationService } from 'src/app/shared/navigations/navigation.service';

@Component({
  selector: '[app-menu-items]',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  host: {
    '[class.layout-root-menuitem]': 'root || active',
    '[class.active-menuitem]': '(active)'
},
animations: [
    trigger('children', [
        state('void', style({
            height: '0px',
            padding: '0px'
        })),
        state('hiddenAnimated', style({
            height: '0px',
            padding: '0px'
        })),
        state('visibleAnimated', style({
            height: '*'
        })),
        state('visible', style({
            height: '*'
        })),
        state('hidden', style({
            height: '0px',
            padding: '0px'
        })),
        transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('void => visibleAnimated, visibleAnimated => void',
            animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class MenuItemsComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number = 0;

    @Input() root: boolean = false;

    @Input() parentKey: string = "";

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = "";

    userType: any = "";

    constructor(
        public app: AppMainComponent, 
        public router: Router, 
        private navigation: NavigationService,
        private menuService: MenuService,
        private session:SessionService
    ) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.app.isHorizontal()) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
        });

        this.userType = this.session.userInformation.getLoggedInUserTypeId();
    }

    ngOnInit() {
        if (!this.app.isHorizontal() && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], this.item.child ? false : true);
    }

    itemClick(event: Event, path:any = "") {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return true;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.child) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;

            // reset horizontal menu
            if (this.app.isHorizontal()) {
                this.menuService.reset();
                this.app.menuHoverActive = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }

        if (path) {
            this.navigation.navigateTo(path);
        }

        return true;
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root  && this.app.isHorizontal() && this.app.isDesktop()) {
            if (this.app.menuHoverActive) {
                this.menuService.onMenuStateChange(this.key);
                this.active = true;
            }
        }
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}

