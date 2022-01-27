import { Injectable } from '@angular/core';
import {UserInfoModel} from "../../../Models/UserInfoModel";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;

  constructor() {}

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
  }
  getAuthToken(): string {
    if(this.UserInfo?.authToken){
      return this.UserInfo.authToken;
    }
    return "";
  }
  getUserInfo(): any {
    if(this.UserInfo){
      return this.UserInfo
    }
    return undefined;
  }

}
