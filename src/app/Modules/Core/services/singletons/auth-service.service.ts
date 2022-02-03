import { Injectable } from '@angular/core';
import { LikeModel } from 'src/app/Models/LikeModel';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;

  constructor(
    private params: HttpParamsServiceService) {}

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
    this.params.GetPQuery.likedTags = this.UserInfo.likedTags;
    console.log(this.UserInfo);
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
    return null;
  }
  getLikes(): any {
    if(this.UserInfo){
      return this.UserInfo.likes;
    }
    return null;
  }
  isUserLogged(): boolean {
    return (this.UserInfo != null);
  }

}
