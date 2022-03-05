import {Injectable, isDevMode} from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {HttpParamsServiceService} from "../http/http-params-service.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AccountModel} from "../../Models/AccountModel";
import {LikeModel} from "../../Models/LikeModel";
import {HttpServiceService} from "../http/http-service.service";
import {Picture} from "../../Models/Picture";

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
          next: (value : LikeModel[]) => {
            this.UserInfo!.likes = value;
          }
        });
    }
  }
  updatePictureLikes(picture: Picture): Picture {
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
    id: "08d9ea60-058c-4f9c-8599-2cd37b693c34",
    nickname: "ShrekTheCreator",
    email: "test",
    pictures: [
      {
        id: "08d9ea60-0591-4550-843d-465368cacf9b",
        accountId: "08d9ea60-058c-4f9c-8599-2cd37b693c34",
        accountNickname: "ShrekTheCreator",
        name: "Shrek",
        description: "Shrek",
        tags: [
          "shrek",
          "green",
          "handsomeMan",
          "original"
        ],
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Focs-pl.oktawave.com%2Fv1%2FAUTH_2887234e-384a-4873-8bc5-405211db13a2%2Fsplay%2F2018%2F11%2Fshrek-reboot-film.jpeg&f=1&nofb=1",
        pictureAdded: "2014-02-03T18:33:58",
        likes: [
          {
            "id": 1,
            "accountId": "08d9ea60-4170-499c-8330-f6dfe54a1d98",
            "pictureId": "08d9ea60-0591-4550-843d-465368cacf9b",
            "isLike": true
          }
        ]
      },
      {
        id: "08d9ea60-0594-4175-8c57-4d5434a62ebb",
        accountId: "08d9ea60-058c-4f9c-8599-2cd37b693c34",
        accountNickname: "ShrekTheCreator",
        name: "Shrek stoned",
        description: "Shrek is stoned",
        tags: [
          "shrek",
          "420",
          "stoned",
          "green",
          "handsomeMan"
        ],
        url: "http://3.bp.blogspot.com/_GoN5EPxM4Y8/S-3O8XQippI/AAAAAAAAAJI/HkXJaFXTr1g/w1200-h630-p-k-no-nu/shrek1ta5.jpg",
        pictureAdded: "2022-02-07T18:33:58",
        likes: []
      }
    ],
    accountCreated: ""
  },
  likedTags: "",
  authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZDllYTYwLTA1OGMtNGY5Yy04NTk5LTJjZDM3YjY5M2MzNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTaHJla1RoZUNyZWF0b3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzIiwiZXhwIjoxNjQ2OTIxNjIyLCJpc3MiOiJodHRwczovL3BpY3R1cmVBcGkuY29tIiwiYXVkIjoiaHR0cHM6Ly9waWN0dXJlQXBpLmNvbSJ9.0fWyzZJPGqF1ursXr8IJ0LYLz0l5uZFOhnwHJk6EUEA",
  likes: []
}

