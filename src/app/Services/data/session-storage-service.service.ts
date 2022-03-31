import { Injectable } from '@angular/core';
import {UserInfoModel} from "../../Models/UserInfoModel";
import {LikeModel} from "../../Models/ApiModels/LikeModel";
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {HttpServiceService} from "../http/http-service.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {
  userSubject: Subject<boolean> = new Subject<boolean>(); // on login/logout

  constructor(
    private httpService: HttpServiceService,
  ) {
    this.userSubject.next(false);
  }

  updateSessionInfo(val: UserInfoModel) {
    sessionStorage.setItem('sessionInfo', JSON.stringify(val));
  }
  getSessionInfo(): UserInfoModel | null {
    let sessionInfoString = sessionStorage.getItem('sessionInfo');
    if (sessionInfoString) {
      return JSON.parse(sessionInfoString);
    }
    return null;
  }

  isSessionStorageEmpty() {
    return this.getSessionInfo() === null;
  }
  isLoggedOn(): boolean {
    let sessionInfo = this.getSessionInfo();
    return !(sessionInfo === null);
  }


  updateLikes(): void {
    if (this.isLoggedOn()){
      this.httpService.getAccountLikesRequest(this.getSessionInfo()?.accountDto.id)
        .subscribe({
          next: (value: LikeModel[]) => {
            let sessionInfo = this.getSessionInfo();
            if (sessionInfo) {
              sessionInfo.likes = value;
              this.updateSessionInfo(sessionInfo);
            }
          }
        });
    }
  }
  updatePictureLikes(picture: PictureModel): PictureModel {
    picture.likeCount = picture.likes.filter(l => l.isLike).length;
    picture.dislikeCount = picture.likes.filter(l => !l.isLike).length;
    if (this.isLoggedOn()) {
      picture.isLiked = picture.likes.some(
        (l) =>
          (l.accountId == this.getSessionInfo()?.accountDto.id) && (l.isLike)
      );
      picture.isDisliked = picture.likes.some(
        (l) =>
          (l.accountId == this.getSessionInfo()?.accountDto.id) && (!l.isLike)
      );
    }
    return picture;
  }

}
