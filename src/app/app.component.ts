import {Component} from '@angular/core';
import {LayoutService} from './shared/services/layout.service';
import {ActuatorsService} from './shared/services/actuators.service';

@Component({
    selector: 'app-root',
    standalone: false,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public appInitialized: boolean = false;

    constructor(
        private actuatorsService: ActuatorsService,
        private layoutService: LayoutService) {
        this.initServices()
            .then(() => {
                this.appInitialized = true;
                console.log("success");
            })
            .catch((reason) => {
                console.log(`Failed to initialize application, the error is: ${reason}`);
            })
    }

    async initServices() {
        console.log("initializing actuators service ...");
        await this.actuatorsService.initialize();
        console.log("initializing layout service ...");
        await this.layoutService.initialize();
    }
}
