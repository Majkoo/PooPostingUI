import { Component, OnInit } from '@angular/core';
import {SessionStorageServiceService} from "../../../Services/data/session-storage-service.service";
import {ErrorLogModel} from "../../../Models/ErrorLogModel";
import {ErrorInfoModel} from "../../../Models/ErrorInfoModel";
import {Clipboard} from "@angular/cdk/clipboard";
import {MessageService} from "primeng/api";
import {EmailBuilderServiceService} from "../../../Services/helpers/email-builder-service.service";
import {HttpServiceService} from "../../../Services/http/http-service.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs!: ErrorLogModel;
  displayLogs: string[] = [];
  canSendLogs: boolean = true;
  isLoggedOn: boolean = false;

  constructor(
    private clipboard: Clipboard,
    private messageService: MessageService,
    private sessionStorageService: SessionStorageServiceService,
    private emailBuilderService: EmailBuilderServiceService,
    private httpService: HttpServiceService,
  ) { }

  ngOnInit(): void {
    this.logs = this.sessionStorageService.getLogs();
    this.isLoggedOn = this.sessionStorageService.isLoggedOn();
    if(this.logs) {
      this.logs.errors.forEach((err) => {
        this.displayLogs.push(JSON.stringify(err, null, '\t'));
      })
    }
    if(this.stringToBool(sessionStorage.getItem('errLogsSent'))){
      this.canSendLogs = false;
    }
  }

  copyErrorLog(error: ErrorInfoModel) {
    this.messageService.clear();
    this.clipboard.copy(this.jsonToString(error));
    this.messageService.add({
      severity: 'success',
      summary: 'Sukces!',
      detail: `Pomyślnie skopiowano log błędu z ${error.date} do schowka!`,
    })
  }

  sendErrorLogs() {
    this.httpService.postSendLogsRequest(this.emailBuilderService.buildEmail(this.logs))
    .subscribe({
      next: val => {
        if (val) {
          sessionStorage.setItem('errLogsSent', 'true');
          this.canSendLogs = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces!',
            detail: `Pomyślnie wysłano obecne error logi do programisty!`,
          })
        }
      }
    })
  }

  stringToJson(val: string) {
    return JSON.parse(val);
  }
  jsonToString(val: ErrorInfoModel) {
    return JSON.stringify(val, null, '\t');
  }
  stringToBool(val: string | undefined | null) {
    return val == "true";
  }
}
