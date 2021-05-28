import { Component, OnInit } from '@angular/core';
import { _navigation } from 'src/app/shared/navigations/routes.mock';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit {

    menu: any[];

    constructor(
        private navPath: _navigation
    ) {
      this.menu = [];
    }

    ngOnInit() {
        this.menu = [
             {
                child: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "dashboard",
                        allowedUserTypes: [1,2,3,4,5,7,8,9]
                    }
                ]
             },{
                child: [
                    {
                        label: 'Course',
                        icon: 'pi pi-fw pi-clone',
                        routerLink: "course",
                        allowedUserTypes: [1,2,3,4,5,7,8,9]
                    }
                ]
             },{
                 child: [
                     {
                        label: 'Schedule',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: "schedule",
                        allowedUserTypes: [1,2,3,5,7,8,9]
                     }
                 ]
             },{
                 child: [
                     {
                        label: 'Events',
                        icon: 'pi pi-fw pi-clock',
                        routerLink: "event",
                        allowedUserTypes: [1,2,3,5,7,8,9]
                     }
                 ]
             },
             {
                child: [
                    {
                        label: 'Aircraft',
                        icon: 'pi pi-fw pi-home',   
                        allowedUserTypes: [1,2,3,4,5,7,8,9],
                        routerLink: "",
                        child: [
                            {
                                label: 'Aircraft List',
                                routerLink: "aircraftlist",
                                allowedUserTypes: [1,2,3,4,5,7,8,9]
                            },
                            {
                                label: 'Aircraft Group',
                                routerLink: "aircraftgroup",
                                allowedUserTypes: [5,7,8,9]
                            }
                        ]
                    }
                ] 
             },
             {
                 child: [
                     {
                        label: 'Users',
                        icon: 'pi pi-fw pi-home',
                        allowedUserTypes: [2,5,7,8,9],
                        routerLink: "",
                        child: [
                            {
                                label: 'User List',
                                routerLink: "userlist",
                                allowedUserTypes: [2,5,7,8,9]
                            },
                            {
                                label: 'Instructor Group',
                                routerLink: "instructorgroup",
                                allowedUserTypes: [5,7,8,9]
                            }
                        ]
                     }
                ]
             },{
                 child: [
                     {
                        label: 'My Clients',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "myclients",
                        allowedUserTypes: [2,9]
                     }
                 ]
             },{
                 child: [
                     {
                        label: 'Announcements',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "announcement",
                        allowedUserTypes: [1,2,3,4,5,7,8,9]
                     }
                 ]
             },{
                 child: [
                     {
                        label: 'Safety Reports',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "safetyreport",
                        allowedUserTypes: [1,2,3,4,5,7,8,9]
                     }
                 ]
             },
             {
                 child: [
                     {
                        label: 'Accounts',
                        icon: 'pi pi-fw pi-home',
                        allowedUserTypes: [5,7,8,9],
                        routerLink: "",
                        child: [
                            {
                                label: 'Account List',
                                routerLink: "account",
                                allowedUserTypes: [5,7,8,9]
                            }
                        ]
                    }
                ]
             },{
                 child: [
                    {
                        label: 'Reports',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "report",
                        allowedUserTypes: [3,5,7,8,9]
                    }
                 ]
             },{
                 child: [
                     {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "settings",
                        allowedUserTypes: [5,7,8,9]
                    }
                 ]
             },{
                 child: [
                     {
                        label: 'My Profile',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "profile",
                        allowedUserTypes: [1,2,3,4,5,7,8,9]
                    }
                 ]
             },{
                 child: [
                     {
                        label: 'Support',
                        icon: 'pi pi-fw pi-home',
                        routerLink: "support",
                        allowedUserTypes: [5,7,8,9]
                    }
                 ]
             },
        ];
    }

}
