import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import AppComposition from '../model/composition/app-composition';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  private urlComposition = 'assets/composition/composition.json';
  private appComposition: AppComposition;

  constructor(private http: HttpClient) {
  }

  getApplicationComposition(): AppComposition {
    return this.appComposition;
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.http.get<AppComposition>(this.urlComposition).toPromise()
      .then((composition) => {
        this.appComposition = composition;
        resolve();
      })
      .catch((reason) => reject(reason))
    });
  }

}
