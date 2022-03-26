import { Injectable } from '@angular/core';
import {PictureModel} from "../../Models/ApiModels/PictureModel";
import {AuthServiceService} from "../data/auth-service.service";
import {AccountModel} from "../../Models/ApiModels/AccountModel";

@Injectable({
  providedIn: 'root'
})
export class AllowModifyServiceService {

  constructor(
    private authService: AuthServiceService
  ) { }

  allowModifyPicture(pic: PictureModel) {
    let userInfo = this.authService.getUserInfo()
    if(userInfo){
      pic.isModifiable = (pic.accountId === userInfo.accountDto.id) || (userInfo.accountDto.roleId === 3);
    }
  }
  allowModifyAccount(acc: AccountModel) {
    let userInfo = this.authService.getUserInfo()
    if(userInfo){
      acc.isModifiable = (acc.id === userInfo.accountDto.id) || (userInfo.accountDto.roleId === 3);
    }
  }

}
