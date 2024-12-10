import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActuatorsService} from '../../../shared/services/actuators.service';
import Widget from '../../../shared/model/layout/widget';
import Actuator from '../../../shared/model/actuator';
import {ActuatorsStateService} from '../../../shared/services/actuators-state.service';

@Component({
    selector: 'wdgt-trigger',
    standalone: false,
    templateUrl: './wdgt-trigger.component.html',
    styleUrls: ['./wdgt-trigger.component.scss']
})
export class WdgtTriggerComponent {

    @Input() widget: Widget;

    private actuator: Actuator;

    constructor(
        private actuatorsService: ActuatorsService,
        private actuatorsStateService: ActuatorsStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        let actuatorUuid = this.widget.components[0].actuatorUuid;
        console.log(`wdtg-trigger ${this.widget.uuid}, ${actuatorUuid}`);
        this.actuator = this.actuatorsService.actuatorByUuid(actuatorUuid);
    }

    onTrigger(event: any) {
        this.actuatorsStateService.requestTrigger(this.widget.components[0].componentUuid)
            .then(value => {
                console.log(`Received: ${value}`);
            })
            .catch(reason => {
                console.log(`Request failed: ${reason}`);
                this.snackBar.open('Communication with server failed!', null, {duration: 5000});
            });
        return false;
    }
}
