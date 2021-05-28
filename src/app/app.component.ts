import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { NavigationService } from './shared/navigations/navigation.service';
import { SessionService } from './shared/session/session.service';
import { LocalstorageService } from './shared/storage/localstorage.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    topbarTheme = 'light';

    menuTheme = 'dim';

    layoutMode = 'light';

    menuMode = 'static';

    isRTL = false;

    inputStyle = 'filled';

    ripple: boolean = false;

    topHeader: boolean = false;

    leftMenu: boolean = false;

    loadPage: boolean = false;

    isRefreshed: boolean = true;

    previousUrl: any = "";

    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private session: SessionService,
        private navigation: NavigationService,
        private storage: LocalstorageService
        ) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) { 
                    if (this.isRefreshed && (event.url == "/" || event.url == "/login")) {   
                      this.isRefreshed = false;  
                    } 
                    this.setCurrentAsPreviousUrl(event.url);     
                    if (this.isRefreshed) {
                        this.isRefreshed = false;
                        this.getUserDetailsByToken();
                    }             
                };
            });
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }

    public setCurrentAsPreviousUrl(value: any) {
        this.previousUrl = value;
    }
    
    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    getUserDetailsByToken() {
        this.session.getUserDetailsByToken("",(response: any) => {
            if (response.type == "success") {
                this.topHeader = true;
                this.leftMenu = true;
                this.loadPage = true;
                var path = this.storage.fromStorage.get("currentState");
                this.navigation.setBroadCrumbOnNavigation(path);
            } else {
                this.navigation.navigateTo("login");
            }
        });
    }
}
