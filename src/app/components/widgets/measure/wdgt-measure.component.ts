import {Component, Input} from '@angular/core';
import {formatNumber} from '@angular/common';
import Widget from '../../../shared/model/layout/widget';
import Actuator from '../../../shared/model/actuator';
import Measure from './measure';
import {ActuatorsService} from '../../../shared/services/actuators.service';

const DEFAULT_ICON_PATH = "assets/measure.svg";

@Component({
    selector: 'wdgt-measure',
    standalone: false,
    templateUrl: './wdgt-measure.component.html',
    styleUrls: ['./wdgt-measure.component.scss']
})
export class WdgtMeasureComponent {

    @Input() widget: Widget;

    private actuator: Actuator;
    private measure: Measure;

    public isKnown: boolean;
    public iconPath: string;
    public reading: string;
    public unit: string;

    constructor(
        private actuatorsService: ActuatorsService) {
    }

    ngOnInit() {
        console.log(`Rendering widget ${this.widget.uuid}`);
        this.actuator = this.actuatorsService.actuatorByUuid(this.widget.components[0].actuatorUuid);
        this.resetState();
    }

    private resetState() {
        this.isKnown = this.actuator && this.actuator.state != null;

        if (!this.actuator) {
            this.measure = null;
            this.iconPath = DEFAULT_ICON_PATH;
            this.reading = 'Error';
            this.unit = '--';
            console.log(`Unknown actuator ${this.widget.components[0].actuatorUuid}`)
        } else if (this.isKnown) {
            this.measure = this.actuator.state as Measure;
            this.iconPath = this.pickIcon(this.measure.quantity);
            this.reading = this.formatReading(this.measure.value, this.measure.decimals);
            this.unit = this.measure.unit;
        } else {
            this.measure = null;
            this.iconPath = DEFAULT_ICON_PATH;
            this.reading = '--.-';
            this.unit = '--';
        }
    }

    private pickIcon(quantity: string): string {
        if (quantity == 'Temperature') {
            return 'assets/measure-temperature.svg';
        } else {
            return DEFAULT_ICON_PATH;
        }
    }

    private formatReading(value: number, decimals: number): string {
        let decimalDivider = Math.pow(10, decimals);
        let realValue = value / decimalDivider;
        let reading = formatNumber(realValue, 'en-US', `1.${decimals}-${decimals}`);
        console.log(reading);
        return reading;
    }
}
