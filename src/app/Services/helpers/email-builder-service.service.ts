import { Injectable } from '@angular/core';
import {ErrorLogModel} from "../../Models/JsonModels/ErrorLogModel";
import {PostSendLogsModel} from "../../Models/ApiModels/PostSendLogsModel";
import {SessionStorageServiceService} from "../data/session-storage-service.service";
import {Location} from "@angular/common";
import {ConfigServiceService} from "../data/config-service.service";
import {UserDataServiceService} from "../data/user-data-service.service";

@Injectable({
  providedIn: 'root'
})
export class EmailBuilderServiceService {

  constructor(
    private userDataService: UserDataServiceService,
    private location: Location,
    private config: ConfigServiceService,
  ) { }

  buildEmail(errorLogs: ErrorLogModel, userMsg: string): PostSendLogsModel {
    let user = this.userDataService.getUserInfo();
    return {
      emailSubject: `Zgłoszenie błędu | Użytkownik: ${user?.accountDto.nickname}`,
      emailBody: `<p>
                    <span style="font-size: 18px; line-height: 24px"><b>Zgłoszenie błędu</b></div><br>
                    <span style="font-size: 16px; line-height: 24px">Wysłano przez użytkownika: ${user.accountDto.nickname}, ${user?.accountDto.email}</span>
                  </p>
                  <p>
                    <b>Wiadomość od użytkownika:</b><br> <div style="margin-left: 32px; max-width: 100ch"><i>${userMsg}</i></div>
                  </p>
                  <p>
                    <small>Ten e-mail został wygenerowany automatycznie.</small><br>
                    <small>PicturesUI, <a href="${this.config.appUrl}">${this.config.appUrl}</a></small>
                  </p>`,
      emailJsonLog: errorLogs.errors.length ? JSON.stringify(errorLogs, null, '\t') : ""
    };
  }
}
