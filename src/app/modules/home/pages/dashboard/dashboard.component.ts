import { Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/shared/constants/custom-response.model';
import { OpenRecords } from 'src/app/shared/constants/open-records.model';
import { TableDataConfig, TableSettings } from 'src/app/shared/constants/table-config.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  openRecord: OpenRecords[] = [];

  openRecordTableConfig: TableDataConfig[] = [
    {
      headerName: "Client",
      field: "client",
      visiblity: true,
      type: "label",
      filterConfig: {
        canFilter: true,
        format: "text"
      }
    },
    {
      headerName: "Flight Type",
      field: "flighttype",
      visiblity: true,
      type: "label",
      filterConfig: {
        canFilter: false,
        format: "text"
      }
    },
    {
      headerName: "Course",
      field: "course",
      visiblity: true,
      type: "label",
      filterConfig: {
        canFilter: false,
        format: "text"
      }
    },
    {
      headerName: "Date",
      field: "date",
      visiblity: true,
      type: "label",
      filterConfig: {
        canFilter: true,
        format: "date"
      }
    },
    {
      headerName: "Action",
      field: "action",
      visiblity: true,
      type: "button",
      filterConfig: {
        canFilter: false,
        format: "text"
      },
      onClick: (rowInfo:any) => {
        window.alert("clicked row's IA_ID..."+ rowInfo.appointmentid);
      }
    },
    {
      headerName: "Id",
      field: "appointmentid",
      visiblity: false,
      type: "label",
      filterConfig: {
        canFilter: false,
        format: "text"
      }
    },
  ];

  openRecordSettings: TableSettings = {
    paginator: true,
    hover: true,
    search: true,
    selectoption: false,
    export: [{
      type: "csv",
      label: "CSV",
      name: "Open-Records",
      format: "internal"
    },{
      type: "pdf",
      label: "PDF",
      name: "Open-Records",
      format: "internal"
    }]
  };

  constructor(
    private dashboardServices: DashboardService
  ) { 
  }

  ngOnInit(): void {
    this.getCardDetails();
  }

  getCardDetails() {
    this.dashboardServices.getDashboardCards('Open Record', (response: CustomResponse) => {
      if (response.type == 'success') { 
        this.openRecord = response.data;
      } 
    });
  }

}
