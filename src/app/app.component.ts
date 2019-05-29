import { Component } from '@angular/core';
import { AppliancesService } from "./shared/services/appliances.service";
import { CompositionService } from "./shared/services/composition.service";
import { BindingsService } from "./shared/services/bindings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private appInitialized: boolean;
  private appInterrupted: boolean;

  constructor(
    private appliancesService: AppliancesService,
    private compositionService: CompositionService,
    private bindingsService: BindingsService) {
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
    await this.compositionService.initialize();
    await this.bindingsService.initialize();
  }
}
