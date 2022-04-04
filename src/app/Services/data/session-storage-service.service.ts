import { Injectable } from '@angular/core';
import {UserInfoModel} from "../../Models/UserInfoModel";
import {LikeModel} from "../../Models/ApiModels/LikeModel";
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {HttpServiceService} from "../http/http-service.service";
import {Subject} from "rxjs";
import {ErrorLogModel} from "../../Models/ErrorLogModel";
import {ErrorInfoModel} from "../../Models/ErrorInfoModel";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {
  userSubject: Subject<boolean> = new Subject<boolean>(); // on login/logout
  errorLogs!: ErrorLogModel;

  constructor(
    private httpService: HttpServiceService,
  ) {
    this.userSubject.next(false);
    this.updateLogs();
  }

  pushError(err: ErrorInfoModel) {
    let errors = this.getLogs()
    errors.errors.push(err);
    sessionStorage.setItem("errorLogs", JSON.stringify(errors));
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



  getLogs() {
    this.updateLogs();
    return this.errorLogs;
  }
  private updateLogs() {
    if (sessionStorage.getItem("errorLogs")) {
      this.errorLogs = JSON.parse(sessionStorage.getItem("errorLogs")!);
    } else {
      this.errorLogs = { errors: [] };
    }
  }
}
