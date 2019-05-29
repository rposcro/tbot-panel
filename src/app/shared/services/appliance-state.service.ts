import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { map } from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplianceStateService {

  private urlBase = `${environment.server.baseUrl}/appliances`;

  constructor(private http: HttpClient) { }

  requestOnOffChange(applianceId: string, state: boolean): Promise<boolean> {
    let url = this.combineUrl(applianceId, 'onoff');
    return this.sendRequest(url, { 'on': state});
  }

  private sendRequest(url: string, body: any): Promise<boolean> {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200')

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
    return `${this.urlBase}/${applianceId}/state/${stateType}`;
  }
}
