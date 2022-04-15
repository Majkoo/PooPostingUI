import {Injectable} from '@angular/core';
import {LsJwtDetails} from "../../Models/ApiModels/LsJwtDetails";
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

  saveJwtDetails(val: LsJwtDetails) {
    localStorage.setItem('jwtDetails', JSON.stringify(val));
  }
  getJwtDetails(): LsJwtDetails | null {
    let jwtDetailsString = localStorage.getItem('jwtDetails');
    if (jwtDetailsString) {
      return JSON.parse(jwtDetailsString);
    }
    return null;
  }

  cookiesAlertAccepted() {
    localStorage.setItem('cookiesAlertShown', 'true');
  }
  isCookiesAlertAccepted(): boolean {
    return localStorage.getItem('cookiesAlertShown') ? localStorage.getItem('cookiesAlertShown') === "true": false;
  }

  logout() {
      this.router.navigate(['/logged-out']).then(val => {
        if (val) {
          localStorage.clear();
          this.userDataService.userSubject.next(false);
        }
      });
    }

}
