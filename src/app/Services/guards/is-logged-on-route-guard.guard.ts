import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {SessionStorageServiceService} from "../data/session-storage-service.service";
import {LocationServiceService} from "../helpers/location-service.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOnRouteGuardGuard implements CanActivate {
  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private locationSercice: LocationServiceService,
  ) {
  }

  canActivate(): boolean {
    if (!this.sessionStorageService.isLoggedOn()) {
      return true;
    } else {
      this.locationSercice.goBack();
      return false;
    }
  }

}
