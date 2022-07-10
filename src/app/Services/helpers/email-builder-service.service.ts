import {Injectable} from '@angular/core';
import {ErrorLogModel} from "../../Models/JsonModels/ErrorLogModel";
import {PostSendLogsModel} from "../../Models/ApiModels/Post/PostSendLogsModel";
import {ConfigServiceService} from "../data/config-service.service";
import {CacheServiceService} from "../data/cache-service.service";

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderServiceService {

  constructor(
    private cacheService: CacheServiceService,
    private configService: ConfigServiceService,
  ) {

  }

  buildEmail(errorLogs: ErrorLogModel, userMsg: string): PostSendLogsModel {
    let logs: PostSendLogsModel = {
      firstName: this.cacheService.getCachedUserAccount().nickname,
      emailAddress: this.cacheService.getCachedUserAccount().email,
      text: userMsg,
      sendingApp: this.configService.getConfig().appWebUrl,
      jsonLogsAttachment: errorLogs.errors.length ? JSON.stringify(errorLogs, null, '\t') : ""
    };
    return logs;
  }
}
