import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import Appliance from "../model/appliance";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {

  private urlAppliances = `${environment.server.baseUrl}/appliances`;
  private appliances: Appliance[];
  private appliancesPerId: Map<string, Appliance>;

  constructor(private http: HttpClient) { }

  allAppliances(): Appliance[] {
    return this.appliances;
  }

  applianceById(applianceId: string) {
    return this.appliancesPerId.get(applianceId);
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.http.get<Appliance[]>(this.urlAppliances).toPromise()
        .then((appliances) => {
          this.appliances = appliances;
          this.appliancesPerId = new Map();
          appliances.forEach(appliance => this.appliancesPerId.set(appliance.id, appliance));
          resolve();
        })
        .catch((reason) => reject(reason))
    });
  }
}
