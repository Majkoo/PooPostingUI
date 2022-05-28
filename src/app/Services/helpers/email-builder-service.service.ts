import {Injectable} from '@angular/core';
import {ErrorLogModel} from "../../Models/JsonModels/ErrorLogModel";
import {PostSendLogsModel} from "../../Models/ApiModels/PostSendLogsModel";
import {ConfigServiceService} from "../data/config-service.service";
import {UserDataServiceService} from "../data/user-data-service.service";
import {UserInfoModel} from "../../Models/UserInfoModel";

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderServiceService {

  constructor(
    private userDataService: UserDataServiceService,
    private configService: ConfigServiceService,
  ) { }

  buildEmail(errorLogs: ErrorLogModel, userMsg: string): PostSendLogsModel {
    const user: UserInfoModel = this.userDataService.getUserInfo();
    return {
      firstName: user.accountDto.nickname,
      emailAddress: user.accountDto.email,
      text: userMsg,
      sendingApp: this.configService.appWebUrl,
      jsonLogsAttachment: errorLogs.errors.length ? JSON.stringify(errorLogs, null, '\t') : ""
    };
  }
}
