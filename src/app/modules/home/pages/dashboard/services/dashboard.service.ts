import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { SessionService } from 'src/app/shared/session/session.service';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { OpenRecords } from 'src/app/shared/constants/open-records.model';
import { FlightTypes } from 'src/app/shared/constants/mocks/flight-types.mock';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  openRecordFormattedList: OpenRecords[] = [];

  responseTemplate: CustomResponse;

  constructor(
    private globalService: GlobalService,
    private session: SessionService,
    private flighttype: FlightTypes
  ) {
    this.responseTemplate = new CustomResponse();
  }

  getDashboardCards(cardname:any,response: any) {
    const userid = this.session.userInformation.getUserUUID();
    return this.globalService.getDashboardCards("",userid+"/card/"+ cardname).subscribe(
      data => {

        if (cardname == "Open Record") {
          if (data.myopenrecords && data.myopenrecords.length) {
            this.responseTemplate.type = "success";
            this.responseTemplate.data = this.makeOpenRecordTableData(data);
            this.responseTemplate.message = "success";
            response(this.responseTemplate);
          }
        }
        
        response(this.responseTemplate);
      },
      error => {
        this.responseTemplate.message = error;
        response(this.responseTemplate);
      }
    );
  }

  makeOpenRecordTableData(response: any) {
    this.openRecordFormattedList = [];
    const recordList = response.myopenrecords;
    recordList.forEach((record:any) => {
      let recordObject = new OpenRecords();
      recordObject.client = record.user.UI_FIRST_NAME + " " + record.user.UI_LAST_NAME;
      recordObject.flighttype = this.flighttype.list[record.IA_FLIGHT_TYPE -1];
      recordObject.course = (record.course)? record.course.COU_NAME: "-";
      recordObject.date = record.IA_PRE_BRIEF_ORI_TIME;
      recordObject.appointmentid = record.IA_ID;
      recordObject.action = "Sign";

      this.openRecordFormattedList.push(recordObject);    
    });
    return this.openRecordFormattedList;
  }
}
