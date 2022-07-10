import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {AppConfig} from "../../Models/AppConfig";

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  private appConfig!: AppConfig;

  constructor(private http: HttpClient) { }

  async load(): Promise<void> {
    this.appConfig = await lastValueFrom(this.http.get<AppConfig>('assets/app-settings.json'));
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }

}
