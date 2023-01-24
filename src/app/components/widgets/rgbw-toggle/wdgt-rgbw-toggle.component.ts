import {Component, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplianceStateService} from "../../../shared/services/appliance-state.service";
import {AppliancesService} from "../../../shared/services/appliances.service";
import Widget from "../../../shared/model/layout/widget";
import Appliance from "../../../shared/model/appliance";
import ApplianceClass from "../../../shared/model/appliance.class";
import WidgetComponent from "../../../shared/model/layout/widget.component";
import {isDefined} from "@angular/compiler/src/util";

@Component({
    selector: 'wdgt-rgbw-toggle',
    templateUrl: './wdgt-rgbw-toggle.component.html',
    styleUrls: ['./wdgt-rgbw-toggle.component.scss']
})
export class WdgtRgbwToggleComponent {

    @Input() widget: Widget;

    private applianceSwitch: Appliance;
    private applianceColor: Appliance;

    public isKnown: boolean;
    public isOn: boolean;
    public selectedColor: String;

    constructor(
        private appliancesService: AppliancesService,
        private stateService: ApplianceStateService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.applianceColor = this.appliancesService.applianceById(this.componentByApplianceClass(ApplianceClass.RGBWAppliance).applianceId);
        this.applianceSwitch = this.appliancesService.applianceById(this.componentByApplianceClass(ApplianceClass.OnOffAppliance).applianceId);
        this.resetState();
    }

    onSwitchChange(event: any) {
        this.stateService.requestOnOffChange(this.applianceSwitch.id, !this.isOn)
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
        this.stateService.requestRGBWChange(this.applianceColor.id, red, green, blue, white);
    }

    public componentByApplianceClass(applianceClass: ApplianceClass): WidgetComponent {
        return this.widget.components.find(
            component => component.applianceClass == applianceClass
        );
    }

    private resetState() {
        this.isKnown = isDefined(this.applianceColor.stateValue);
        this.isOn = this.isKnown && this.applianceSwitch.stateValue['on'] === true;

        if (this.isKnown) {
            let state = this.applianceColor.stateValue;
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
