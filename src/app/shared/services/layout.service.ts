import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConfigurationService} from "./configuration.service";
import PanelLayout from "../model/layout/panel.layout";
import Stencil from "../model/layout/stencil";

const STENCIL_OWNER: string = 'tbot-panel';
const STENCIL_TYPE: string = 'layout';

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
            this.http.get<Stencil>(this.layoutUrl()).toPromise()
                .then((stencil) => {
                    this.layoutDefinition = stencil.payload;
                    console.log(this.layoutDefinition);
                    resolve();
                })
                .catch((reason) => reject(reason))
        });
    }

    private layoutUrl(): string {
        return `${this.configuration.apiUrl()}/admin/stencils/owners/${STENCIL_OWNER}/types/${STENCIL_TYPE}`;
    }
}
