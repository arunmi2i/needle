import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PathSettings { 
    login: string = "user/login";
    logout: string = "user/logout";
    useriInfoByToken: string = "user/getUserDetailsByToken";
    getDashboardCard: string = "dashboard/getdetails/";
    getAnnouncement: string = "announcement/";
    getEvent: string = "event/";
}