import { Component, OnInit } from '@angular/core';
import {SessionStorageServiceService} from "../../../Services/data/session-storage-service.service";
import {ErrorLogModel} from "../../../Models/ErrorLogModel";
import {ErrorInfoModel} from "../../../Models/ErrorInfoModel";
import {Clipboard} from "@angular/cdk/clipboard";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs!: ErrorLogModel;
  displayLogs: string[] = [];
  constructor(
    private clipboard: Clipboard,
    private messageService: MessageService,
    private sessionStorageService: SessionStorageServiceService,
  ) { }

  ngOnInit(): void {
    this.logs = this.sessionStorageService.getLogs();
    if(this.logs) {
      this.logs.errors.forEach((err) => {
        this.displayLogs.push(JSON.stringify(err, null, '\t'));
      })
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

  stringToJson(val: string) {
    return JSON.parse(val);
  }
  jsonToString(val: ErrorInfoModel) {
    return JSON.stringify(val, null, '\t');
  }
}
