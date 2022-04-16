import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserDataServiceService} from "./user-data-service.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(
    private router: Router,
    private userDataService: UserDataServiceService,
  ) { }

  saveJwtToken(val: string) {
    localStorage.setItem('jwtToken', val);
  }
  saveJwtUid(val: string) {
    localStorage.setItem('uid', val);
  }
  getJwtToken(): string | null {
    let jwtTokenString = localStorage.getItem('jwtToken');
    if (jwtTokenString) {
      return jwtTokenString;
    }
    return null;
  }
  getJwtUid(): string | null {
    let jwtTokenString = localStorage.getItem('uid');
    if (jwtTokenString) {
      return jwtTokenString;
    }
    return null;
  }
  isUserDataSaved(): boolean {
    return localStorage.getItem('jwtToken') != null && localStorage.getItem('uid') != null;
  }

  cookiesAlertAccepted() {
    localStorage.setItem('cookiesAlertShown', 'true');
  }
  isCookiesAlertAccepted(): boolean {
    return localStorage.getItem('cookiesAlertShown') ? localStorage.getItem('cookiesAlertShown') === "true": false;
  }

  logout() {
    this.userDataService.logout();
  }

}
