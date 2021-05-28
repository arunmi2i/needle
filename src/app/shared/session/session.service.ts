import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { LocalstorageService } from '../storage/localstorage.service';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../constants/custom-response.model';

const S3_PATH = environment.S3_PATH;
const PROFILE_IMG = "assets/uploads/UserInfo/thumbnails/";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  responseTemplate: CustomResponse;

  constructor(private globalService:GlobalService, private storage:LocalstorageService) { 
    this.responseTemplate = new CustomResponse();
  }

  user: any = "";

  getUserDetailsByToken(request: any, response: any) {
    return this.globalService.getUserDetailsByToken(request).subscribe(data => {
      if (data.USER_UUID) {
        this.responseTemplate.type = "success";
        this.responseTemplate.data = data;
        this.responseTemplate.message = "success";
        this.setToLocalStorage(data);
        this.userInformation.set(data);
      }
      response(this.responseTemplate);
    }, error => {
      this.responseTemplate.message = error;
      response(this.responseTemplate);
    })
  }

  userInformation: any = {
    set: (response: any) => {
      this.user = response;
    },
    clear: () => {
      this.user = "";
    },
    isValid: () => {
      return !!(this.user);
    },
    getLoggedInUserName: () => {
      var loggedInUser = this.user;
      var fullname = "";
      console.log(this.user);
      if (this.user.userinfo) {
          if ((loggedInUser.userinfo.UI_FIRST_NAME && ('null' != loggedInUser.userinfo.UI_FIRST_NAME)) && (loggedInUser.userinfo.UI_LAST_NAME && ('null' != loggedInUser.userinfo.UI_LAST_NAME))) {
            fullname = loggedInUser.userinfo.UI_FIRST_NAME + ' ' + loggedInUser.userinfo.UI_LAST_NAME;
          } else if (loggedInUser.userinfo.UI_FIRST_NAME && ('null' != loggedInUser.userinfo.UI_FIRST_NAME)) {
            fullname = loggedInUser.userinfo.UI_FIRST_NAME;
          } else if (loggedInUser.userinfo.UI_LAST_NAME && ('null' != loggedInUser.userinfo.UI_LAST_NAME)) {
            fullname = loggedInUser.userinfo.UI_LAST_NAME;
          }
      }
      return fullname;
    },
    getLoggedInUserType: () => {
      if (this.user) {
        if (this.user.usertypes) {
          return this.user.usertype.UT_NAME;
        }
        return "";
      }
      return "";
    },
    getLoggedInUserTypeId: () => {
      if (this.user) {
        if (this.user.usertypes) {
          return this.user.usertype.UT_ID;
        }
        return 0;
      }
      return 0;
    },
    getTenantLogo: () => {
      if (this.userInformation.isValid()) {
        if (this.user.tenantInfo) {
          // return (this.user.tenantInfo.TENANT_LOGO)? this.user.tenantInfo.TENANT_LOGO : "Logo_blue_black.jpg";
          return 'assets/uploads/tenant/thumbnails/photo_1_1620134160.jpg';
        }
        return 'assets/uploads/tenant/thumbnails/photo_1_1620134160.jpg';
      }
      return 'assets/uploads/tenant/thumbnails/photo_1_1620134160.jpg';
    },
    getUserProfileImage: () => {
      if (this.userInformation.isValid()) { 
        // if (this.user.userinfo) {
        //   return (this.user.userinfo.UI_USER_PHOTO)? S3_PATH + PROFILE_IMG + this.user.userinfo.UI_USER_PHOTO : PROFILE_IMG + "default-user-icon.jpeg";
        // }
        return PROFILE_IMG + "default-user-icon.png";
      }
      return PROFILE_IMG + "default-user-icon.png";
    },
    getUserUUID: () => {
      if (this.userInformation.isValid()) {
        return this.user.USER_UUID;
      }
      return "";
    }
  }

  setToLocalStorage(data: any) {
    this.storage.toStorage.set("apitoken", data.api_token);
    this.storage.toStorage.set("currentLocation", data.USER_LOCATION_ID);
  }

  getFromLocalStorage(key: any) {
    this.storage.fromStorage.get(key);
  }

}
