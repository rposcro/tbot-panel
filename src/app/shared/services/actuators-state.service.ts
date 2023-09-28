import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { ConfigurationService } from "./configuration.service";
import OnOffState from "../model/state/on-off-state.class";
import widgetType from "../model/layout/widget.type";
import RgbwState from "../model/state/rgbw-state.class";

@Injectable({
  providedIn: 'root'
})
export class ActuatorsStateService {

  constructor(private http: HttpClient, private configuration: ConfigurationService) { }

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
    return this.http
    .put(url, body, {
      observe: 'response'
    })
    .pipe(map(response => {
      if (response.status == 200 || response.status == 204) {
        return true;
      } else {
        console.log(`Error code from server: ${response.status}`);
        return false;
      }
    }))
    .toPromise();
  }

  private combineUrl(): string {
    return `${this.configuration.apiUrl()}/actuators/state`;
  }
}
