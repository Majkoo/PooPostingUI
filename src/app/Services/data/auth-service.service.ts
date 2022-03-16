import {Injectable, isDevMode} from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {HttpServiceService} from "../http/http-service.service";
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {AccountModel} from "../../Models/ApiModels/AccountModel";
import {LikeModel} from "../../Models/ApiModels/LikeModel";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  UserInfo: UserInfoModel | undefined;
  userSubject: Subject<boolean> = new Subject<boolean>(); // on login/logout

  constructor(
    private params: HttpParamsServiceService,
    private router: Router,
    private http: HttpServiceService,
  ) {
    this.userSubject.next(false);

    if (isDevMode()){
      // implement better login
      this.setUserInfo(devAccountInfo);
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
    return this.UserInfo?.authToken ?? "";
  }
  getUserInfo(): any {
    return this.UserInfo ?? undefined;
  }
  isUserLogged(): boolean {
    return (this.UserInfo !== undefined);
  }

  logout() {
    this.UserInfo = undefined;
    this.userSubject.next(false);
    this.router.navigate(['/logged-out']);
  }

  updateLikes(): void {
    if (this.isUserLogged()){
      this.http.getAccountLikesRequest(this.UserInfo?.accountDto.id)
        .subscribe({
          next: (value: LikeModel[]) => {
            this.UserInfo!.likes = value;
          }
        });
    }
  }
  updatePictureLikes(picture: PictureModel): PictureModel {
    picture.likeCount = picture.likes.filter(l => l.isLike).length;
    picture.dislikeCount = picture.likes.filter(l => !l.isLike).length;
    if (this.isUserLogged()) {
      picture.isLiked = picture.likes.some(
        (l) =>
          (l.accountId == this.getUserInfo().accountDto.id) && (l.isLike)
      );
      picture.isDisliked = picture.likes.some(
        (l) =>
          (l.accountId == this.getUserInfo().accountDto.id) && (!l.isLike)
      );
    }
    return picture;
  }

}


const devAccountInfo: UserInfoModel = {
  accountDto: {
    id: "08da076c-7009-4954-8a5a-56895ad5d268",
    nickname: "ShrekTheCreator",
    email: "test",
    pictures: [],
    accountCreated: ""
  },
  likedTags: "",
  authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGEwNzZjLTcwMDktNDk1NC04YTVhLTU2ODk1YWQ1ZDI2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTaHJla1RoZUNyZWF0b3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzIiwiZXhwIjoxNjUyNjMyNDQ1LCJpc3MiOiJodHRwczovL3BpY3R1cmVBcGkuY29tIiwiYXVkIjoiaHR0cHM6Ly9waWN0dXJlQXBpLmNvbSJ9.bltC8WIP0jIgZSQWjQYL0CrEqbw0TAWdYpmBAhulCjc",
  likes: [],
}

