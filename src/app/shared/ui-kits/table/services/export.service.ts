import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CSV_EXTENSION = '.csv';
const PDF_EXTENSION = '.pdf';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { 

  }

  generatePdf(header?:any, tableData?:any, filename?:string,) {
    let headers = [header];
    let pdf = new jsPDF();

    pdf.setFontSize(2);
    // pdf.text('Angular PDF Table', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    (pdf as any).autoTable({
    head: headers,
    body: tableData,
    theme: 'plain',
      didDrawCell: (data:any) => {
      }
    })

    // Open PDF document in browser's new tab
    // pdf.output('datauri');

    // Download PDF doc  
    pdf.save(filename+PDF_EXTENSION);

}

  public exportToCsv(rows: object[], fileName: string, columns?: string[], headers?:any) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      headers.join(separator) +
      '\n' +
      rows.map((row:any) => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
}
