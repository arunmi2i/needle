import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  responseTemplate: CustomResponse = new CustomResponse();

  constructor(private globalService: GlobalService) { }

  getActiveAnnouncemnets(response:any) {
    return this.globalService.getAnnouncements("active/false").subscribe(
      data => {
         if (data.length) {
            this.responseTemplate.type = "success";
            this.responseTemplate.data = data;
            this.responseTemplate.message = "success";
            response(this.responseTemplate);
          }
      },
      error => {
        this.responseTemplate.message = error;
        response(this.responseTemplate);
      }
    );
  } 
}
