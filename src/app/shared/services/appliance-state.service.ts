import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { ConfigurationService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class ApplianceStateService {

  constructor(private http: HttpClient, private configuration: ConfigurationService) { }

  requestOnOffChange(applianceId: string, state: boolean): Promise<boolean> {
    let url = this.combineUrl(applianceId, 'on-off');
    return this.sendRequest(url, { 'state': state});
  }

  requestRGBWChange(applianceId: string, red: number, green: number, blue: number, white: number) {
    let url = this.combineUrl(applianceId, 'color');
    return this.sendRequest(url, {
      'red': red,
      'green': green,
      'blue': blue,
      'white': white
    })
  }

  private sendRequest(url: string, body: any): Promise<boolean> {
    return this.http
    .patch(url, body, {
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

  private combineUrl(applianceId: string, stateType: string): string {
    return `${this.configuration.apiUrl()}/appliances/${applianceId}/state/${stateType}`;
  }
}
