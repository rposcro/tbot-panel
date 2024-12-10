import {Component, Input} from '@angular/core';
import Widget from '../../../shared/model/layout/widget';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ReportDialogComponent} from './report-dialog.component';
import {ActuatorsService} from '../../../shared/services/actuators.service';
import Actuator from '../../../shared/model/actuator';

@Component({
    selector: 'wdgt-report',
    standalone: false,
    templateUrl: './wdgt-report.component.html',
    styleUrls: ['./wdgt-report.component.scss']
})
export class WdgtReportComponent {

    @Input() widget: Widget;

    public entryCount: String;

    private actuator: Actuator;

    constructor(
        private actuatorsService: ActuatorsService,
        private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.entryCount = '?';
        this.actuator = this.actuatorsService.actuatorByUuid(this.widget.components[0].actuatorUuid);
        let entries = this.actuator.state as any[];
        this.entryCount = entries.length.toString();
    }

    showReport(event: any) {
        const config = new MatDialogConfig();
        config.autoFocus = true;
        config.minWidth = "50%";
        config.minHeight = "60%";
        config.data = {
            actuator: this.actuator
        };

        let dialogRef = this.matDialog.open(ReportDialogComponent, config);
    }
}
