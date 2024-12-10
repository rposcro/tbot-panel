import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import Actuator from "../model/actuator";
import {ConfigurationService} from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class ActuatorsService {

    private actuators: Actuator[];
    private actuatorsPerUuid: Map<string, Actuator>;

    constructor(private http: HttpClient, private configuration: ConfigurationService) {
    }

    allActuators(): Actuator[] {
        return this.actuators;
    }

    actuatorByUuid(uuid: string) {
        return this.actuatorsPerUuid.get(uuid);
    }

    initialize() {
        return new Promise((resolve, reject) => {
            this.http.get<Actuator[]>(this.actuatorsUrl()).toPromise()
                .then((actuators) => {
                    this.actuators = actuators;
                    this.actuatorsPerUuid = new Map();
                    actuators.forEach(actuator => this.actuatorsPerUuid.set(actuator.uuid, actuator));
                    resolve();
                })
                .catch((reason) => reject(reason))
        });
    }

    private actuatorsUrl(): string {
        return `${this.configuration.apiUrl()}/actuators`;
    }
}
