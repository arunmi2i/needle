import { Component, Input, OnInit } from '@angular/core';
import { OpenRecords } from '../../constants/open-records.model';
import { ExportTableData, TableDataConfig, TableSettings } from '../../constants/table-config.model';
import { ExportService } from './services/export.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableHeader: TableDataConfig[] = [];

  @Input() tableData: any[] = [];

  @Input() config: TableSettings = new TableSettings;

  formattedTableHeader: any = [];

  headerFeilds: string[] = [];

  headers: string[] = [];

  tableValues: any = [];

  selectedRows: any = "";

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.formatTableHeader();
  }

  formatTableHeader() {
    this.tableHeader.forEach((header:any) => {
      if(header.visiblity == true) {
        this.formattedTableHeader.push(header);
        this.headerFeilds.push(header.field);
        this.headers.push(header.headerName);
      }
    })
  }

  export(file:ExportTableData) {
    if (file.type == 'csv') {
      this.exportService.exportToCsv(this.tableData, file.name , this.headerFeilds, this.headers);
    } else if(file.type == 'pdf') {
      this.tableValues = [];
      this.tableData.forEach((data:any) => {
        this.tableValues.push(Object.values(data));
      });
      this.exportService.generatePdf(this.headers,this.tableValues, file.name);
    }
  }

}
