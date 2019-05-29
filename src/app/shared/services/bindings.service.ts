import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import ApplianceWidgetBinding from "../model/appliance-widget-binding";
import WidgetType from "../model/widgets/widget.type";

@Injectable({
  providedIn: 'root'
})
export class BindingsService {

  private urlBindings = 'assets/composition/bindings.json';
  private bindings: ApplianceWidgetBinding[];
  private widgetPerAppliance: Map<string, WidgetType>;

  constructor(private http: HttpClient) {
  }

  widgetForAppliance(applianceId: string): WidgetType {
    return this.widgetPerAppliance.get(applianceId);
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.urlBindings).toPromise()
      .then((bindings) => {
        this.bindings = bindings.map(this.convertToModel);
        this.widgetPerAppliance = new Map();
        this.bindings.forEach(binding => this.widgetPerAppliance.set(binding.applianceId, binding.widgetType));
        resolve();
      })
      .catch((reason) => reject(reason))
    });
  }

  private convertToModel(dto: any): ApplianceWidgetBinding {
    return {
      applianceId: dto['appliance-id'],
      widgetType: dto['widget-type']
    } as ApplianceWidgetBinding;
  }
}
