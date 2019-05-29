import { Component, Input } from '@angular/core';
import Appliance from "../../../shared/model/appliance";

@Component({
  selector: 'wdgt-undefined',
  templateUrl: './wdgt-undefined.component.html',
  styleUrls: ['./wdgt-undefined.component.scss']
})
export class WdgtUndefinedComponent {

  @Input() appliance: Appliance;
}
