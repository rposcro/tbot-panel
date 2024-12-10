import { Component, Input } from '@angular/core';
import Widget from "../../../shared/model/layout/widget";
import {ActuatorsService} from "../../../shared/services/actuators.service";
import Actuator from "../../../shared/model/actuator";

@Component({
  selector: 'wdgt-undefined',
  templateUrl: './wdgt-undefined.component.html',
  styleUrls: ['./wdgt-undefined.component.scss']
})
export class WdgtUndefinedComponent {

  @Input() widget: Widget;

  public actuator: Actuator;

  constructor(
      private actuatorsService: ActuatorsService) {
  }

  ngOnInit() {
    this.actuator = this.actuatorsService.actuatorByUuid(this.widget.components[0].actuatorUuid);
  }
}