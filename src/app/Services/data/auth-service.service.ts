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
