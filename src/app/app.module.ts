import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';


import { ErrorMessageComponent } from './shared/ui-kits/error-message/error-message.component';
import { TableComponent } from './shared/ui-kits/table/table.component';

import { LoginComponent } from './modules/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { LeftmenuComponent } from './core/leftmenu/leftmenu.component';
import { MenuItemsComponent } from './core/leftmenu/menu-items/menu-items.component';
import { authInterceptorProviders } from './core/interceptors/auth-interceptor.service';
import { CourseComponent } from './modules/home/pages/course/course.component';
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard.component';
import { ScheduleComponent } from './modules/home/pages/schedule/schedule.component';
import { AircraftComponent } from './modules/home/pages/aircraft/aircraft.component';
import { UserComponent } from './modules/home/pages/user/user.component';
import { AnnouncementComponent } from './modules/home/pages/announcement/announcement.component';
import { ReportComponent } from './modules/home/pages/report/report.component';
import { SettingsComponent } from './modules/home/pages/settings/settings.component';
import { SafetyreportComponent } from './modules/home/pages/safetyreport/safetyreport.component';
import { AccountComponent } from './modules/home/pages/account/account.component';
import { AppMainComponent } from './modules/home/app.main.component';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './core/breadcrumb/service/breadcrumb.service';
import { EventComponent } from './modules/home/pages/event/event.component';
import { ListComponent } from './modules/home/pages/event/components/list/list.component';
import { CreateComponent } from './modules/home/pages/event/components/create/create.component';
import { ViewComponent } from './modules/home/pages/event/components/view/view.component';
import { TabMenuComponent } from './shared/ui-kits/tab-menu/tab-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftmenuComponent,
    MenuItemsComponent,
    DashboardComponent,
    CourseComponent,
    ScheduleComponent,
    AircraftComponent,
    UserComponent,
    EventComponent,
    AnnouncementComponent,
    ReportComponent,
    SettingsComponent,
    SafetyreportComponent,
    AccountComponent,
    ErrorMessageComponent,
    TableComponent,
    AppMainComponent,
    BreadcrumbComponent,
    ListComponent,
    CreateComponent,
    ViewComponent,
    TabMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    ProgressBarModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    DataViewModule,
    RatingModule,
    TabMenuModule,
  ],
  providers: [authInterceptorProviders, BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
