import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConfigurationService} from "./configuration.service";
import PanelLayout from "../model/layout/panel.layout";
import Schema from "../model/layout/schema";

const SCHEMA_OWNER: string = 'tbot-panel';
const SCHEMA_TYPE: string = 'layout';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private urlComposition = 'assets/composition/composition.json';
    private layoutDefinition: PanelLayout;

    constructor(private http: HttpClient, private configuration: ConfigurationService) {
    }

    getPanelLayoutDefinition(): PanelLayout {
        return this.layoutDefinition;
    }

    initialize() {
        return new Promise((resolve, reject) => {
            this.http.get<Schema>(this.layoutUrl()).toPromise()
                .then((schema) => {
                    this.layoutDefinition = schema.payload;
                    console.log(this.layoutDefinition);
                    resolve();
                })
                .catch((reason) => reject(reason))
        });
    }

    private layoutUrl(): string {
        return `${this.configuration.apiUrl()}/admin/schemas/owners/${SCHEMA_OWNER}/types/${SCHEMA_TYPE}`;
    }
}
