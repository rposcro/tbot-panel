import { Component, Input } from '@angular/core';
import Appliance from "../../../shared/model/appliance";
import { MatSlideToggleChange, MatSnackBar } from "@angular/material";
import { ApplianceStateService} from "../../../shared/services/appliance-state.service";

@Component({
  selector: 'wdgt-toggle',
  templateUrl: './wdgt-toggle.component.html',
  styleUrls: ['./wdgt-toggle.component.scss']
})
export class WdgtToggleComponent {

  @Input() appliance: Appliance;

  private isKnown: boolean;
  private isOn: boolean;

  constructor(
    private stateService: ApplianceStateService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isKnown = this.appliance.stateValue != null && this.appliance.stateValue['on'] != undefined;
    this.isOn = this.isKnown && this.appliance.stateValue['on'] === true;
  }

  onStateChange(event: MatSlideToggleChange) {
    this.stateService.requestOnOffChange(this.appliance.id, event.checked)
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
}
