import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";

import { environment } from "../../../environments/environment";

const REPLACEMENT_HOST_URL: string = '${hostUrl}';
const REPLACEMENT_HOST_SCHEMA: string = '${hostSchema}';
const REPLACEMENT_HOST_NAME: string = '${hostName}';
const REPLACEMENT_HOST_PORT: string = '${hostPort}';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public apiUrl() {
    return environment.server.baseUrl
      .replace(REPLACEMENT_HOST_URL, `${document.location.protocol}//${document.location.hostname}:${document.location.port}`)
      .replace(REPLACEMENT_HOST_SCHEMA, document.location.protocol)
      .replace(REPLACEMENT_HOST_NAME, document.location.hostname)
      .replace(REPLACEMENT_HOST_PORT, document.location.port)
      ;
  }
}
