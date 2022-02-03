import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AppConfiguration } from 'src/app/Models/AppConfiguration';

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
        this.apiUrl = data!.apiUrl;
        this.picturesUrl = data!.picturesUrl;
        console.log('Config successfully loaded')
      })
      .catch(() => {
        console.error('Could not load configuration')
      })
  }

}
