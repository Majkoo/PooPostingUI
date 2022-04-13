import { Injectable } from '@angular/core';
import {UserInfoModel} from "../../Models/UserInfoModel";
import {LikeModel} from "../../Models/ApiModels/LikeModel";
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {HttpServiceService} from "../http/http-service.service";
import {Subject} from "rxjs";
import {ErrorLogModel} from "../../Models/JsonModels/ErrorLogModel";
import {ErrorInfoModel} from "../../Models/JsonModels/ErrorInfoModel";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {
  errorLogs!: ErrorLogModel;

  constructor() { }

  pushError(err: ErrorInfoModel) {
    let errors = this.getLogs()
    errors.errors.push(err);
    sessionStorage.setItem("errorLogs", JSON.stringify(errors));
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
