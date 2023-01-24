import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TabPanelComponent } from './components/tabs/tab-panel.component';
import { WdgtToggleComponent } from './components/widgets/toggle/wdgt-toggle.component';
import { WdgtRgbwToggleComponent } from "./components/widgets/rgbw-toggle/wdgt-rgbw-toggle.component";
import { WdgtMeasureComponent } from "./components/widgets/measure/wdgt-measure.component";
import { WdgtUndefinedComponent } from './components/widgets/undefined/wdgt-undefined.component';

import { WdgtReportModule } from './components/widgets/report/wdgt-report.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule} from '@angular/material/dialog';
import { MccColorPickerModule } from "material-community-components";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TabPanelComponent,
    DesktopComponent,
    WdgtToggleComponent,
    WdgtRgbwToggleComponent,
    WdgtMeasureComponent,
    WdgtUndefinedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    WdgtReportModule,

    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MccColorPickerModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
