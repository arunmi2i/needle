import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/modules/home/app.main.component';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';
import { SessionService } from 'src/app/shared/session/session.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo: any = {};
  tenantInfo: any = {};

  constructor(public appMain: AppMainComponent, public app: AppComponent, private session: SessionService, private auth:AuthenticationService) {

     if (this.session.userInformation.isValid()) {
       this.setUserInformation();
     }
   }

  setUserInformation() {
    this.userInfo.name = this.session.userInformation.getLoggedInUserName();
    this.userInfo.type = this.session.userInformation.getLoggedInUserType();
    this.userInfo.profileImage = this.session.userInformation.getUserProfileImage();
    this.tenantInfo.tenantImage = this.session.userInformation.getTenantLogo();
  }

  ngOnInit(): void {
  }

}
