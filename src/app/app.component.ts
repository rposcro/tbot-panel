import { Component } from '@angular/core';
import { AppliancesService } from "./shared/services/appliances.service";
import { LayoutService } from "./shared/services/layout.service";
import {ActuatorsService} from "./shared/services/actuators.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appInitialized: boolean;
  public appInterrupted: boolean;

  constructor(
    private appliancesService: AppliancesService,
    private actuatorsService: ActuatorsService,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.initServices()
    .then(() => {
      this.appInitialized = true;
      console.log("success");
    })
    .catch((reason) => {
      this.appInterrupted = true;
      console.log(`error: ${reason}`);
    })
  }

  async initServices() {
    await this.appliancesService.initialize();
    await this.actuatorsService.initialize();
    await this.layoutService.initialize();
  }
}
