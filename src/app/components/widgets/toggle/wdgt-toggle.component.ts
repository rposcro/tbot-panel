import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplianceStateService} from "../../../shared/services/appliance-state.service";
import {AppliancesService} from "../../../shared/services/appliances.service";
import Widget from "../../../shared/model/layout/widget";
import Appliance from "../../../shared/model/appliance";

@Component({
    selector: 'wdgt-toggle',
    templateUrl: './wdgt-toggle.component.html',
    styleUrls: ['./wdgt-toggle.component.scss']
})
export class WdgtToggleComponent {

    @Input() widget: Widget;

    public isKnown: boolean;
    public isOn: boolean;

    private appliance: Appliance;

    constructor(
        private appliancesService: AppliancesService,
        private stateService: ApplianceStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.appliance = this.appliancesService.applianceById(this.widget.components[0].applianceId);
        this.isKnown = this.appliance.stateValue != null && this.appliance.stateValue['on'] != undefined;
        this.isOn = this.isKnown && this.appliance.stateValue['on'] === true;
    }

    onStateChange(event: any) {
        this.stateService.requestOnOffChange(this.appliance.id, !this.isOn)
            .then(value => {
                console.log(`Received: ${value}`);
                if (value) {
                    this.switchState();
                } else {
                    this.failState();
                }
            })
            .catch(reason => {
                console.log(`Request failed: ${reason}`);
                this.failState();
            });
        return false;
    }

    private switchState() {
        this.isOn = !this.isOn;
        this.isKnown = true;
    }

    private failState() {
        this.snackBar.open('Communication with server failed!', null, {duration: 5000});
        this.isOn = false;
        this.isKnown = false;
    }
}
