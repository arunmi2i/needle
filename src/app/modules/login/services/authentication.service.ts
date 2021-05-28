import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { GlobalService } from 'src/app/core/services/global.service';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { SessionService } from 'src/app/shared/session/session.service';
import { LocalstorageService } from 'src/app/shared/storage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  responseTemplate: CustomResponse; 

  constructor(private globalService: GlobalService, private storage: LocalstorageService, private session:SessionService) {
    this.responseTemplate = new CustomResponse();
   }

  login(email: string, password: string, rememberMe :number, response: any) {
    password = Md5.init(password);
    return this.globalService.login({
      email,
      password,
      rememberMe
    }).subscribe(
      data => {
        if (data.USER_UUID) {
          this.responseTemplate.type = "success";
          this.responseTemplate.data = data;
          this.responseTemplate.message = "success";
          this.session.setToLocalStorage(data);
          this.session.userInformation.set(data);
          response(this.responseTemplate);
        }
        response(this.responseTemplate);
      },
      error => {
        this.responseTemplate.message = error;
        response(this.responseTemplate);
      }
    );
  }

  logout(response: any) {
    return this.globalService.logout().subscribe(
      data => {
        this.storage.clearStorage();
        response(data);
      },
      error => {
        this.storage.clearStorage();
        response(error);
      }
    )
  }
}
