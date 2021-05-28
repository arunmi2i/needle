import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { EventList } from 'src/app/shared/constants/event-list.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventListFormatted: any = [];

  responseTemplate: CustomResponse = new CustomResponse();

  constructor(private globalService: GlobalService) { }

  getActiveEvents(response:any) {
    return this.globalService.getEvents("status/active").subscribe(
      data => {
         if (data.length) {
            this.responseTemplate.type = "success";
            this.responseTemplate.data = this.makeEventListResponse(data);
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

  makeEventListResponse(response: any) {
    this.eventListFormatted = [];
    const eventList = response;
    eventList.forEach((event:any) => {
      let eventObject = new EventList();
      eventObject.name = event.EVENT_NAME;
      eventObject.date = event.EVENT_DATE;
      eventObject.time = event.EVENT_START_TIME + event.EVENT_END_TIME;
      eventObject.location = (event.tenantdetail)? event.tenantdetail.TENANT_NAME: "-";
      eventObject.availableseats = event.EVENT_TOTAL_SEATS - event.SEAT_COUNT;
      eventObject.id = event.EVENT_ID;
      eventObject.image = "/assets/images/default_event_icon.png";
      this.eventListFormatted.push(eventObject);    
    });
    return this.eventListFormatted;
  }
}
