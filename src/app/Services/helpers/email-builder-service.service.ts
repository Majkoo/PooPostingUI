import {Injectable} from '@angular/core';
import {ErrorLogModel} from "../../Models/JsonModels/ErrorLogModel";
import {PostSendLogsModel} from "../../Models/ApiModels/Post/PostSendLogsModel";
import {ConfigServiceService} from "../data/config-service.service";
import {UserDataServiceService} from "../data/user-data-service.service";
import {HttpServiceService} from "../http/http-service.service";

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderServiceService {

  constructor(
    private userDataService: UserDataServiceService,
    private configService: ConfigServiceService,
    private httpService: HttpServiceService
  ) {

  }

  buildEmail(errorLogs: ErrorLogModel, userMsg: string): PostSendLogsModel {
    let logs: PostSendLogsModel = {
      firstName: "undefined",
      emailAddress: "undefined",
      text: userMsg,
      sendingApp: this.configService.appWebUrl,
      jsonLogsAttachment: errorLogs.errors.length ? JSON.stringify(errorLogs, null, '\t') : ""
    };
    // await this.httpService.getAccountRequest(this.userDataService.getUserInfo().id)
    //   .subscribe({
    //     next: (v) => {
    //       logs.firstName = v.nickname;
    //       logs.emailAddress = v.email;
    //     }
    //   })
    return logs;
  }
}
