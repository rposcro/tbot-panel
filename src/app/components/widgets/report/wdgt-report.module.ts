import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from "@angular/material/table";
import { WdgtReportComponent } from "./wdgt-report.component";
import { ReportDialogComponent } from "./report-dialog.component";

@NgModule({
    declarations: [
        WdgtReportComponent,
        ReportDialogComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule
    ],
    providers: [
    ],
    bootstrap: [
        WdgtReportComponent
    ],
    exports: [
        WdgtReportComponent
    ],
    entryComponents: [
        ReportDialogComponent
    ]
})
export class WdgtReportModule { }
