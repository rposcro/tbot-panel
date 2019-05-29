import {Component, Input} from '@angular/core';
import {AppliancesService} from "../../shared/services/appliances.service";
import {BindingsService} from "../../shared/services/bindings.service";
import Appliance from "../../shared/model/appliance";
import WidgetType from "../../shared/model/widgets/widget.type";

@Component({
  selector: 'tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent {

  @Input() appliancesIds: String[];

  constructor(
    private appliancesService: AppliancesService,
    private bindingsService: BindingsService) {
  }

  applianceById(applianceId: string): Appliance {
    return this.appliancesService.applianceById(applianceId);
  }

  widgetForAppliance(applianceId: string): WidgetType {
    //console.log(this.bindingsService.widgetForAppliance(applianceId));
    return this.bindingsService.widgetForAppliance(applianceId);
  }
}
