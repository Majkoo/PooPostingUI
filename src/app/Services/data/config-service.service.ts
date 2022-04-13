import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AppConfiguration } from 'src/app/Models/JsonModels/AppConfiguration';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService extends AppConfiguration {

  constructor(private http: HttpClient) {
    super();
  }

  load() {
    return this.http.get<AppConfiguration>('assets/app-settings.json')
      .toPromise()
      .then(
        data => {
          this.appTitle = data!.appTitle;
          this.apiUrl = data!.apiUrl;
          this.appUrl = data!.appUrl;
          this.picturesUrl = data!.picturesUrl;
          this.serviceAdmin = data!.serviceAdmin;
          this.serviceAdminEmail = data!.serviceAdminEmail;
          this.hostingProvider = data!.hostingProvider;
        console.log('Config successfully loaded')
      })
      .catch(() => {
        console.error('Could not load configuration')
      })
  }

}
