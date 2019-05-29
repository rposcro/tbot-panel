import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { TabPanelComponent } from './components/tabs/tab-panel.component';
import { WdgtToggleComponent } from './components/widgets/toggle/wdgt-toggle.component';
import { WdgtUndefinedComponent } from './components/widgets/undefined/wdgt-undefined.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule, MatTabsModule } from "@angular/material";
import { MatSnackBarModule } from "@angular/material";
import { MatSlideToggleModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TabPanelComponent,
    DesktopComponent,
    WdgtToggleComponent,
    WdgtUndefinedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
