import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import Appliance from "../model/appliance";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {

  private appliances: Appliance[];
  private appliancesPerId: Map<string, Appliance>;

  constructor(private http: HttpClient, private configuration: ConfigurationService) { }

  allAppliances(): Appliance[] {
    return this.appliances;
  }

  applianceById(applianceId: string) {
    return this.appliancesPerId.get(applianceId);
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.http.get<Appliance[]>(this.appliancesUrl()).toPromise()
        .then((appliances) => {
          this.appliances = appliances;
          this.appliancesPerId = new Map();
          appliances.forEach(appliance => this.appliancesPerId.set(appliance.id, appliance));
          resolve();
        })
        .catch((reason) => reject(reason))
    });
  }

  private appliancesUrl(): string {
    return `${this.configuration.apiUrl()}/appliances`;
  }
}
