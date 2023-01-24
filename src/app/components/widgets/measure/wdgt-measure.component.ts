import {Component, Input} from '@angular/core';
import {formatNumber} from "@angular/common";
import {AppliancesService} from "../../../shared/services/appliances.service";
import Widget from "../../../shared/model/layout/widget";
import Appliance from "../../../shared/model/appliance";
import Measure from "./measure";

const DEFAULT_ICON_PATH = "assets/measure.svg";

@Component({
    selector: 'wdgt-measure',
    templateUrl: './wdgt-measure.component.html',
    styleUrls: ['./wdgt-measure.component.scss']
})
export class WdgtMeasureComponent {

    @Input() widget: Widget;

    private appliance: Appliance;
    private measure: Measure;

    public isKnown: boolean;
    public iconPath: string;
    public reading: string;
    public unit: string;

    constructor(
        private appliancesService: AppliancesService) {
    }

    ngOnInit() {
        console.log(this.widget.id);
        this.appliance = this.appliancesService.applianceById(this.widget.components[0].applianceId);
        this.resetState();
    }

    private resetState() {
        this.isKnown = this.appliance.stateValue != null;

        if (this.isKnown) {
            this.measure = this.appliance.stateValue as Measure;
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
