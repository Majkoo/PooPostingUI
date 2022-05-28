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
          this.appWebUrl = data!.appWebUrl;
          this.picturesApiUrl = data!.picturesApiUrl;
          this.emailApiUrl = data!.emailApiUrl;
          this.captchaKey = data!.captchaKey;
        })
      .catch(() => {
        console.error('Could not load configuration')
      })
  }

}
