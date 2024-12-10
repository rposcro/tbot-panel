import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConfigurationService} from './configuration.service';
import OnOffState from '../model/state/on-off-state.class';
import RgbwState from '../model/state/rgbw-state.class';

@Injectable({
    providedIn: 'root'
})
export class ActuatorsStateService {

    constructor(private http: HttpClient, private configuration: ConfigurationService) {
    }

    requestTrigger(widgetUuid: string): Promise<boolean> {
        let url = this.combineUrl();
        return this.sendRequest(url, {
            'widgetUuid': widgetUuid,
            'payloadType': 'Trigger'
        });
    }

    requestOnOffChange(widgetUuid: string, state: OnOffState): Promise<boolean> {
        let url = this.combineUrl();
        return this.sendRequest(url, {
            'widgetUuid': widgetUuid,
            'payloadType': 'OnOff',
            'payload': state
        });
    }

    requestRGBWChange(widgetUuid: string, state: RgbwState) {
        let url = this.combineUrl();
        return this.sendRequest(url, {
            'widgetUuid': widgetUuid,
            'payloadType': 'Rgbw',
            'payload': state
        });
    }

    private sendRequest(url: string, body: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http
                .put(url, body, {
                    observe: 'response'
                })
                .subscribe({
                    next(response){
                        if (response.status == 200 || response.status == 204) {
                            resolve(true);
                        } else {
                            console.log(`Error code from server: ${response.status}`);
                            resolve(false);
                        }
                    },
                    error(error) {
                        reject(error);
                    }
                });
        });
    }

    private combineUrl(): string {
        return `${this.configuration.apiUrl()}/actuators/state`;
    }
}
