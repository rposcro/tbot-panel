import {Component, Input} from '@angular/core';
import PanelTab from "../../shared/model/layout/panel.tab";

@Component({
  selector: 'tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent {

  @Input() panelTab: PanelTab;

  constructor() {}
}
