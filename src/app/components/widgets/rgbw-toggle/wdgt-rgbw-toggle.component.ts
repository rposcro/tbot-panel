import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import Widget from "../../../shared/model/layout/widget";
import ApplianceClass from "../../../shared/model/appliance.class";
import WidgetComponent from "../../../shared/model/layout/widget.component";
import {isDefined} from "@angular/compiler/src/util";
import Actuator from "../../../shared/model/actuator";
import {ActuatorsService} from "../../../shared/services/actuators.service";
import {ActuatorsStateService} from "../../../shared/services/actuators-state.service";

@Component({
    selector: 'wdgt-rgbw-toggle',
    templateUrl: './wdgt-rgbw-toggle.component.html',
    styleUrls: ['./wdgt-rgbw-toggle.component.scss']
})
export class WdgtRgbwToggleComponent {

    @Input() widget: Widget;

    private switchComponent: WidgetComponent;
    private colorComponent: WidgetComponent;

    private switchActuator: Actuator;
    private colorActuator: Actuator;

    public isKnown: boolean;
    public isOn: boolean;
    public selectedColor: String;

    constructor(
        private actuatorsService: ActuatorsService,
        private actuatorsStateService: ActuatorsStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.switchComponent = this.componentByComponentClass(ApplianceClass.OnOffAppliance);
        this.colorComponent = this.componentByComponentClass(ApplianceClass.RGBWAppliance)
        this.switchActuator = this.actuatorsService.actuatorByUuid(this.switchComponent.actuatorUuid);
        this.colorActuator = this.actuatorsService.actuatorByUuid(this.colorComponent.actuatorUuid);
        this.resetState();
    }

    onSwitchChange(event: any) {
        this.actuatorsStateService.requestOnOffChange(this.switchComponent.componentUuid, { 'on' : !this.isOn })
            .then(value => {
                if (value) {
                    this.switchOnOffState();
                } else {
                    this.failOnOffState();
                }
            })
            .catch(reason => {
                console.log(`Request failed: ${reason}`);
                this.failOnOffState();
            });
    }

    onColorChange(color: any) {
        let red: number = parseInt(color.substr(1, 2), 16);
        let green: number = parseInt(color.substr(3, 2), 16);
        let blue: number = parseInt(color.substr(5, 2), 16);
        let white: number = Math.round((red + green + blue) / 3);
        let statePayload = {
            'red': red,
            'green': green,
            'blue': blue,
            'white': white
        };

        this.actuatorsStateService.requestRGBWChange(this.colorComponent.componentUuid, statePayload);
    }

    public componentByComponentClass(componentClass: ApplianceClass): WidgetComponent {
        return this.widget.components.find(
            component => component.componentClass == componentClass
        );
    }

    private resetState() {
        this.isKnown = isDefined(this.colorActuator.state);
        this.isOn = this.isKnown && isDefined(this.switchActuator.state) && this.switchActuator.state['on'] === true;

        if (this.isKnown) {
            let state = this.colorActuator.state;
            this.selectedColor = `#` +
                `${parseInt(state.red).toString(16).padStart(2, '0')}` +
                `${parseInt(state.green).toString(16).padStart(2, '0')}` +
                `${parseInt(state.blue).toString(16).padStart(2, '0')}`;
        } else {
          this.selectedColor = '';
        }
    }

    private switchOnOffState() {
        this.isOn = !this.isOn;
        this.isKnown = true;
    }

    private failOnOffState() {
        this.snackBar.open('Communication with server failed!', null, {duration: 5000});
        this.isOn = false;
        this.isKnown = false;
    }
}
