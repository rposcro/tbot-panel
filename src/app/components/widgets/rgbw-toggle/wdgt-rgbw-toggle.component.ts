import {Component, Input} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplianceStateService} from "../../../shared/services/appliance-state.service";
import {AppliancesService} from "../../../shared/services/appliances.service";
import Widget from "../../../shared/model/layout/widget";
import Appliance from "../../../shared/model/appliance";
import ApplianceClass from "../../../shared/model/appliance.class";
import WidgetComponent from "../../../shared/model/layout/widget.component";

@Component({
  selector: 'wdgt-rgbw-toggle',
  templateUrl: './wdgt-rgbw-toggle.component.html',
  styleUrls: ['./wdgt-rgbw-toggle.component.scss']
})
export class WdgtRgbwToggleComponent {

  @Input() widget: Widget;

  public isKnown: boolean;
  public isOn: boolean;

  private applianceSwitch: Appliance;
  private applianceColor: Appliance;

  constructor(
      private appliancesService: AppliancesService,
      private stateService: ApplianceStateService,
      private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.applianceColor = this.appliancesService.applianceById(this.componentByApplianceClass(ApplianceClass.RGBWAppliance).applianceId);
    this.applianceSwitch = this.appliancesService.applianceById(this.componentByApplianceClass(ApplianceClass.OnOffAppliance).applianceId);
    this.isKnown = this.applianceSwitch.stateValue != null && this.applianceSwitch.stateValue['on'] != undefined;
    this.isOn = this.isKnown && this.applianceSwitch.stateValue['on'] === true;
  }

  onSwitchChange(event: MatSlideToggleChange) {
    this.stateService.requestOnOffChange(this.applianceSwitch.id, event.checked)
      .then(value => {
        this.isOn = event.checked;
        this.isKnown = true;
      })
      .catch(reason => {
        console.log(`Request failed: ${reason}`);
        this.snackBar.open('Communication with server failed!', null, { duration: 5000 });
        // TODO: implement error popup here
      });
  }

  onColorChange(color: string) {
    let red: number = parseInt(color.substr(1, 2), 16);
    let green: number = parseInt(color.substr(3, 2), 16);
    let blue: number = parseInt(color.substr(5, 2), 16);
    let white: number = Math.round((red + green + blue) / 3);
    this.stateService.requestRGBWChange(this.applianceColor.id, red, green, blue, white);
  }

  public componentByApplianceClass(applianceClass: ApplianceClass): WidgetComponent {
    return this.widget.components.find(
        component => component.applianceClass == applianceClass
    );
  }
}
