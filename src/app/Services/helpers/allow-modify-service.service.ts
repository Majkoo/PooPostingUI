import { Injectable } from '@angular/core';
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {AccountModel} from "../../Models/ApiModels/AccountModel";
import {SessionStorageServiceService} from "../data/session-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class AllowModifyServiceService {

  constructor(
    private sessionStorageService: SessionStorageServiceService,
  ) { }

  allowModifyPicture(pic: PictureModel) {
    let userInfo = this.sessionStorageService.getSessionInfo();
    if(userInfo){
      pic.isModifiable = (pic.accountId === userInfo.accountDto.id) || (userInfo.accountDto.roleId == "3");
      if (userInfo.accountDto.roleId == "3") {
        pic.comments.forEach(c => c.isModifiable = true);
      }
    }
  }
  allowModifyAccount(acc: AccountModel) {
    let userInfo = this.sessionStorageService.getSessionInfo();
    if(userInfo){
      acc.isModifiable = (acc.id === userInfo.accountDto.id) || (userInfo.accountDto.roleId == "3");
    }
  }

}
