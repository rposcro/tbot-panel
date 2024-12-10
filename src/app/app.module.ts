import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient} from "@angular/common/http";
import {DesktopComponent} from "./components/desktop/desktop.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {WdgtMeasureComponent} from "./components/widgets/measure/wdgt-measure.component";
import {WdgtUndefinedComponent} from "./components/widgets/undefined/wdgt-undefined.component";
import {WdgtTriggerComponent} from "./components/widgets/trigger/wdgt-trigger.component";
import {WdgtToggleComponent} from "./components/widgets/toggle/wdgt-toggle.component";
import {WdgtRgbwToggleComponent} from "./components/widgets/rgbw-toggle/wdgt-rgbw-toggle.component";
import {NgxColorsModule} from "ngx-colors";
import {TabPanelComponent} from "./components/tabs/tab-panel.component";
import {WdgtReportModule} from "./components/widgets/report/wdgt-report.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        DesktopComponent,
        TabPanelComponent,

        WdgtMeasureComponent,
        WdgtToggleComponent,
        WdgtRgbwToggleComponent,
        WdgtTriggerComponent,
        WdgtUndefinedComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,

        WdgtReportModule,

        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatCardModule,
        MatToolbarModule,
        MatTabsModule,
        MatDialogModule,
        NgxColorsModule
    ],
    providers: [
        provideHttpClient(),
        provideAnimationsAsync()
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
