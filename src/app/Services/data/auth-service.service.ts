import {Injectable, isDevMode} from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AccountModel} from "../../Models/AccountModel";
import {LikeModel} from "../../Models/LikeModel";

const devAccountInfo = {
  accountDto: {
    id: "08d9ea60-058c-4f9c-8599-2cd37b693c34",
    nickname: "ShrekTheCreator",
    email: "",
    pictures: [],
    accountCreated: ""
  },
  likedTags: "",
  authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZDllYTYwLTA1OGMtNGY5Yy04NTk5LTJjZDM3YjY5M2MzNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTaHJla1RoZUNyZWF0b3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzIiwiZXhwIjoxNjQ2NTg3MjAwLCJpc3MiOiJodHRwczovL3BpY3R1cmVBcGkuY29tIiwiYXVkIjoiaHR0cHM6Ly9waWN0dXJlQXBpLmNvbSJ9.nutD0EA1rMaEsWumgR2RDqEBBW1fJFOWvtlVDI4M9Eo",
  likes: []
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;
  userSubject: Subject<boolean> = new Subject<boolean>();
  likesSubject: Subject<LikeModel[]> = new Subject<LikeModel[]>();

  constructor(
    private params: HttpParamsServiceService,
    private router: Router
  ) {
    this.userSubject.next(false);

    if (isDevMode()){
      this.UserInfo = devAccountInfo;
      console.warn("AUTOMATICALLY LOGGED IN DUE TO DEVELOPMENT MODE")
      this.userSubject.next(true);
    }
  }

  setUserInfo(value: UserInfoModel): void{
    this.UserInfo = value;
    this.params.GetPQuery.likedTags = this.UserInfo.likedTags;
    this.userSubject.next(true);
  }

  setUserAccountInfo(value: AccountModel): void {
    if (this.UserInfo) {
      this.UserInfo!.accountDto = value;
    }
  }

  getAuthToken(): string {
    if(this.UserInfo?.authToken){
      return this.UserInfo.authToken;
    }
    return '';
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
    this.router.navigate(['/logged-out']);
  }

}


