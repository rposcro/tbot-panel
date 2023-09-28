import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActuatorsService} from "../../../shared/services/actuators.service";
import Widget from "../../../shared/model/layout/widget";
import Actuator from "../../../shared/model/actuator";
import {ActuatorsStateService} from "../../../shared/services/actuators-state.service";

@Component({
    selector: 'wdgt-toggle',
    templateUrl: './wdgt-toggle.component.html',
    styleUrls: ['./wdgt-toggle.component.scss']
})
export class WdgtToggleComponent {

    @Input() widget: Widget;

    public isKnown: boolean;
    public isOn: boolean;

    private actuator: Actuator;

    constructor(
        private actuatorsService: ActuatorsService,
        private actuatorsStateService: ActuatorsStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.actuator = this.actuatorsService.actuatorByUuid(this.widget.components[0].actuatorUuid);
        this.isKnown = this.actuator.state != null && this.actuator.state['on'] != undefined;
        this.isOn = this.isKnown && this.actuator.state['on'] === true;
    }

    onStateChange(event: any) {
        this.actuatorsStateService.requestOnOffChange(this.widget.components[0].componentUuid, { 'on': !this.isOn })
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
