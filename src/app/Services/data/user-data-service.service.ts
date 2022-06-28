import { Injectable } from '@angular/core';
import {LikeModel} from "../../Models/ApiModels/Get/LikeModel";
import {PictureModel} from "../../Models/ApiModels/Get/PictureModel";
import {AccountModel} from "../../Models/ApiModels/Get/AccountModel";
import {UserInfoModel} from "../../Models/UserInfoModel";
import {HttpServiceService} from "../http/http-service.service";
import {Router} from "@angular/router";
import {HttpParamsServiceService} from "../http/http-params-service.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  UserInfo: UserInfoModel | undefined;
  userSubject: Subject<boolean> = new Subject<boolean>(); // on login/logout

  constructor(
    private params: HttpParamsServiceService,
    private router: Router,
  ) {
    this.userSubject.next(false);
  }

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
    this.userSubject.next(true);
  }

  getUserInfo(): any {
    return this.UserInfo ?? undefined;
  }
  isUserLoggedOn(): boolean {
    return (this.UserInfo !== undefined);
  }

  logout() {
    this.router.navigate(['auth/logged-out'])
      .then(() => {
        this.UserInfo = undefined;
        this.userSubject.next(false);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('uid');
      });
  }
}
