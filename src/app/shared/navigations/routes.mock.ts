import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class _navigation { 
    url: any = {
        login: "/login",
        dashboard:"/dashboard",
        course:"/course",
        schedule:"/schedule",
        event:"/event",
        aircraftlist:"/aircraftlist",
        aircraftgroup:"/aircraftgroup",
        userlist:"/userlist",
        instructorgroup:"/instructorgroup",
        myclients:"/myclients",
        announcement:"/announcement",
        safetyreport:"/safetyreport",
        account:"/account",
        settings:"/settings",
        profile:"/profile",
        support:"/support",
        report:"/report",
    }
}