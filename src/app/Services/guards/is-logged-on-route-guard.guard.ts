import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {SessionStorageServiceService} from "../data/session-storage-service.service";
import {LocationServiceService} from "../helpers/location-service.service";
import {UserDataServiceService} from "../data/user-data-service.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOnRouteGuardGuard implements CanActivate {
  constructor(
    private userDataService: UserDataServiceService,
    private locationService: LocationServiceService,
  ) {
  }

  canActivate(): boolean {
    if (!this.userDataService.isUserLoggedOn()) {
      return true;
    } else {
      this.locationService.goBack();
      return false;
    }
  }

}
