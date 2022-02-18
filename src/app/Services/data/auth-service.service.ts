import { Injectable } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;
  userSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private params: HttpParamsServiceService,
    private router: Router
  ) {
    this.userSubject.next(false);
  }

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
    this.params.GetPQuery.likedTags = this.UserInfo.likedTags;
    this.userSubject.next(true);
  }

  getAuthToken(): string {
    if(this.UserInfo?.authToken){
      return this.UserInfo.authToken;
    }
    return "";
  }

  getUserInfo(): any {
    if(this.UserInfo){
      return this.UserInfo;
    }
    return undefined;
  }

  isUserLogged(): boolean {
    return (this.UserInfo != null);
  }

  logout() {
    this.UserInfo = undefined;
    this.userSubject.next(false);
    this.router.navigate(['/home']);
    window.location.reload();
  }

}
