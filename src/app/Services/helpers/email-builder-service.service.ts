import { Injectable } from '@angular/core';
import {ErrorInfoModel} from "../../Models/ErrorInfoModel";
import {ErrorLogModel} from "../../Models/ErrorLogModel";
import {PostSendLogsModel} from "../../Models/ApiModels/PostSendLogsModel";
import {SessionStorageServiceService} from "../data/session-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderServiceService {

  constructor(
    private sessionStorageService: SessionStorageServiceService
  ) { }

  buildEmail(errorLogs: ErrorLogModel): PostSendLogsModel {
    return {
      emailSubject: `Error Log | Użytkownik: ${this.sessionStorageService.getSessionInfo()?.accountDto.nickname}`,
      emailBody: `<p>Error log z dnia: ${new Date().toLocaleDateString()}</p>\n<small>PicturesUI, <a href="https://pictures.migra.ml">https://pictures.migra.ml</a></small></body>`,
      emailJsonLog: JSON.stringify(errorLogs, null, '\t');
    };
  }

}
