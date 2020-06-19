import { Component, Input } from '@angular/core';
import { AppliancesService } from "../../../shared/services/appliances.service";
import Widget from "../../../shared/model/layout/widget";
import Appliance from "../../../shared/model/appliance";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ReportDialogComponent } from "./report-dialog.component";

@Component({
  selector: 'wdgt-report',
  templateUrl: './wdgt-report.component.html',
  styleUrls: ['./wdgt-report.component.scss']
})
export class WdgtReportComponent {

  @Input() widget: Widget;

  public entryCount: String;

  private appliance: Appliance;

  constructor(
      private appliancesService: AppliancesService,
      private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.entryCount = '?';
    this.appliance = this.appliancesService.applianceById(this.widget.components[0].applianceId);
    let entries = this.appliance.stateValue as any[];
    this.entryCount = entries.length.toString();
  }

  showReport(event: any) {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.minWidth = "50%";
    config.minHeight = "60%";
    config.data = {
      appliance: this.appliance
    };

    let dialogRef = this.matDialog.open(ReportDialogComponent, config);
  }
}
