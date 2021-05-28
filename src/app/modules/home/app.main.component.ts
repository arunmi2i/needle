import {Component, AfterViewInit, Renderer2, OnDestroy, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/leftmenu/services/menu.service';
import { NavigationService } from 'src/app/shared/navigations/navigation.service';
import { SessionService } from 'src/app/shared/session/session.service';
import { AuthenticationService } from '../login/services/authentication.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements AfterViewInit, OnDestroy {

    rotateMenuButton: boolean = false;

    topbarMenuActive: boolean = false;

    overlayMenuActive: boolean = false;

    staticMenuDesktopInactive: boolean = false;

    staticMenuMobileActive: boolean = false;

    menuClick: boolean = false;

    topbarItemClick: boolean = false;

    activeTopbarItem: any = false;

    documentClickListener: any;

    configActive: boolean = false;

    configClick: boolean = false;

    rightPanelActive: boolean = false;

    rightPanelClick: boolean = false;

    menuHoverActive = false;

    searchClick = false;

    search = false;

    constructor(
        public renderer: Renderer2, 
        private menuService: MenuService,  
        public app: AppComponent,
        private auth:AuthenticationService,
        private session: SessionService,
        private navigation: NavigationService,
    ) { 
    }  

    ngAfterViewInit() {
        // hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            if (!this.rightPanelClick) {
                this.rightPanelActive = false;
            }

            if (!this.menuClick) {
                if (this.overlayMenuActive) {
                    this.overlayMenuActive = false;
                }
                if (this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                }

                this.menuHoverActive = false;
                this.unblockBodyScroll();
            }

            if (!this.searchClick) {
                this.search = false;
            }

            this.searchClick = false;
            this.configClick = false;
            this.topbarItemClick = false;
            this.menuClick = false;
            this.rightPanelClick = false;
        });
    }

    onMenuButtonClick(event: any) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;
        this.menuClick = true;

        if (this.app.menuMode === 'overlay' && !this.isMobile()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
            if (this.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onMenuClick(event: any) {
        this.menuClick = true;
    }

    onTopbarItemClick(event: any, item: any) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item; }

        if (item.className === 'search-item topbar-item') {
            this.search = !this.search;
            this.searchClick = !this.searchClick;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event: any) {
        event.preventDefault();       
    }

    // onRTLChange(event: any) {
    //     this.app.isRTL = event.checked;
    // }

    // onRippleChange(event: any) {
    //     this.app.ripple = event.checked;
    //     this.primengConfig.ripple = event.checked;
    // }

    // onConfigClick(event: any) {
    //     this.configClick = true;
    // }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isStatic() {
        return this.app.menuMode === 'static';
    }

    isHorizontal() {
        return this.app.menuMode === 'horizontal';
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    logout(event: any) {
        event.preventDefault();
        this.auth.logout((response: any) => {
            this.session.userInformation.clear();
            this.navigation.navigateTo("login");
        })
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

}
