import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './modules/home/app.main.component';
import { AccountComponent } from './modules/home/pages/account/account.component';
import { AircraftComponent } from './modules/home/pages/aircraft/aircraft.component';
import { AnnouncementComponent } from './modules/home/pages/announcement/announcement.component';
import { CourseComponent } from './modules/home/pages/course/course.component';
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard.component';
import { EventComponent } from './modules/home/pages/event/event.component';
import { ReportComponent } from './modules/home/pages/report/report.component';
import { SafetyreportComponent } from './modules/home/pages/safetyreport/safetyreport.component';
import { ScheduleComponent } from './modules/home/pages/schedule/schedule.component';
import { SettingsComponent } from './modules/home/pages/settings/settings.component';
import { UserComponent } from './modules/home/pages/user/user.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "*",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"",
    component: AppMainComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "course",
        component: CourseComponent
      },
      {
        path: "schedule",
        component: ScheduleComponent
      },
      {
        path: "event",
        component: EventComponent
      },
      {
        path: "announcement",
        component: AnnouncementComponent
      },
      {
        path: "safetyreport",
        component: SafetyreportComponent
      },
      {
        path: "account",
        component: AccountComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
      {
        path: "aircraft",
        component: AircraftComponent
      },
      {
        path: "user",
        component: UserComponent
      },
      {
        path: "report",
        component: ReportComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
