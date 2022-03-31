import {Injectable} from '@angular/core';
import {LsJwtDetails} from "../../Models/ApiModels/LsJwtDetails";
import {UserInfoModel} from "../../Models/UserInfoModel";
import {Route, Router} from "@angular/router";
import {SessionStorageServiceService} from "./session-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageServiceService,
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

  logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.sessionStorageService.userSubject.next(false);
      this.router.navigate(['/logged-out']);
    }

}
