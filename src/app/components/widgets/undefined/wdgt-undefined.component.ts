import { Component, Input } from '@angular/core';
import {AppliancesService} from "../../../shared/services/appliances.service";
import Appliance from "../../../shared/model/appliance";
import Widget from "../../../shared/model/layout/widget";

@Component({
  selector: 'wdgt-undefined',
  templateUrl: './wdgt-undefined.component.html',
  styleUrls: ['./wdgt-undefined.component.scss']
})
export class WdgtUndefinedComponent {

  @Input() widget: Widget;

  public appliance: Appliance;

  constructor(
      private appliancesService: AppliancesService) {
  }

  ngOnInit() {
    this.appliance = this.appliancesService.applianceById(this.widget.components[0].actuatorUuid);
  }
}