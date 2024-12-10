import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import Widget from '../../../shared/model/layout/widget';
import ApplianceClass from '../../../shared/model/appliance.class';
import WidgetComponent from '../../../shared/model/layout/widget.component';
import Actuator from '../../../shared/model/actuator';
import {ActuatorsService} from '../../../shared/services/actuators.service';
import {ActuatorsStateService} from '../../../shared/services/actuators-state.service';

@Component({
    selector: 'wdgt-rgbw-toggle',
    standalone: false,
    templateUrl: './wdgt-rgbw-toggle.component.html',
    styleUrls: ['./wdgt-rgbw-toggle.component.scss']
})
export class WdgtRgbwToggleComponent {

    @Input() widget: Widget;

    private switchComponent: WidgetComponent;
    private colorComponent: WidgetComponent;

    private switchActuator: Actuator;
    private colorActuator: Actuator;

    public isSwitchKnown: boolean;
    public isColorKnown: boolean;
    public isOn: boolean;
    public selectedColor: String;

    constructor(
        private actuatorsService: ActuatorsService,
        private actuatorsStateService: ActuatorsStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        console.log(`Rendering widget ${this.widget.uuid}`);
        this.switchComponent = this.componentByComponentClass(ApplianceClass.OnOffAppliance);
        this.colorComponent = this.componentByComponentClass(ApplianceClass.RGBWAppliance)
        this.switchActuator = this.actuatorsService.actuatorByUuid(this.switchComponent.actuatorUuid);
        this.colorActuator = this.actuatorsService.actuatorByUuid(this.colorComponent.actuatorUuid);
        this.resetState();
        console.log(`Switch: ${this.switchComponent.actuatorUuid}, Color component: ${this.colorComponent.actuatorUuid}`);
        console.log(`Switch found: ${this.isSwitchKnown}, Color found: ${this.isColorKnown}`);
    }

    onSwitchChange(event: any) {
        this.actuatorsStateService.requestOnOffChange(this.switchComponent.componentUuid, {'on': !this.isOn})
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

    onColorChange(color: string) {
        let red: number = parseInt(color.substring(1, 3), 16);
        let green: number = parseInt(color.substring(3, 5), 16);
        let blue: number = parseInt(color.substring(5, 7), 16);
        let white: number = 255;

        if (color.length == 9) {
            white = parseInt(color.substring(7, 9), 16);
        }

        let statePayload = {
            'red': red,
            'green': green,
            'blue': blue,
            'white': white
        };

        this.actuatorsStateService.requestRGBWChange(this.colorComponent.componentUuid, statePayload);
    }

    public componentByComponentClass(componentClass: ApplianceClass): WidgetComponent {
        let wantedComponent = this.widget.components.find(
            component => component.componentClass == componentClass
        );
        if (!wantedComponent) {
            console.log(`Component of class ${componentClass} not on widget ${this.widget.uuid}! Widget components ${this.widget.components}`);
        }
        return wantedComponent;
    }

    private resetState() {
        this.isSwitchKnown = this.switchActuator.state;
        this.isColorKnown = this.colorActuator.state;
        this.isOn = this.isSwitchKnown && this.switchActuator.state && this.switchActuator.state['on'] === true;

        if (this.isColorKnown) {
            let state = this.colorActuator.state;
            this.selectedColor = `#` +
                `${parseInt(state.red).toString(16).padStart(2, '0')}` +
                `${parseInt(state.green).toString(16).padStart(2, '0')}` +
                `${parseInt(state.blue).toString(16).padStart(2, '0')}` +
                `${parseInt(state.white).toString(16).padStart(2, '0')}`;
        } else {
            this.selectedColor = '';
        }
    }

    private switchOnOffState() {
        this.isOn = !this.isOn;
        this.isSwitchKnown = true;
    }

    private failOnOffState() {
        this.snackBar.open('Communication with server failed!', null, {duration: 5000});
        this.isOn = false;
        this.isSwitchKnown = false;
    }
}
