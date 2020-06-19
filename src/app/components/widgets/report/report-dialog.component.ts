import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {

  public displayedColumns = [ "date", "level", "message" ];
  public rows: ReportRow[];
  public title: string;

  constructor(private dialogRef: MatDialogRef<ReportDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.appliance.name;
    this.rows = new Array<ReportRow>();

    let entries = data.appliance.stateValue as any[];
    entries.forEach(entry => {
      let row: ReportRow = {
        message: entry['message'],
        level: entry['entryLevel'],
        date: entry['timestamp']
      };
      console.log(row);
      this.rows.push(row);
    });
  }
}

interface ReportRow {
  message: string;
  level: string;
  date: string;
}


