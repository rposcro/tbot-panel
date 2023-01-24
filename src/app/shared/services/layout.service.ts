import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConfigurationService} from "./configuration.service";
import PanelLayout from "../model/layout/panel.layout";

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
            this.http.get<PanelLayout>(this.layoutUrl()).toPromise()
                .then((layout) => {
                    this.layoutDefinition = layout;
                    resolve();
                })
                .catch((reason) => reject(reason))
        });
    }

    private layoutUrl(): string {
        return `${this.configuration.apiUrl()}/layout`;
    }
}
