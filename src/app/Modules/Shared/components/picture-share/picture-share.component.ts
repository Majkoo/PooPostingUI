import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {MessageService} from "primeng/api";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-picture-share',
  templateUrl: './picture-share.component.html',
  styleUrls: ['./picture-share.component.scss']
})
export class PictureShareComponent implements OnInit {
  @Output() onCopy: EventEmitter<any> = new EventEmitter<any>();
  @Input() pictureId!: string;
  url: string = "";

  constructor(
    private messageService: MessageService,
    private clipboard: Clipboard,
  ) { }

  ngOnInit() {
    this.url = `${environment.appWebUrl}/picture/${this.pictureId}`;
  }

  copyUrl(textToCopy: string) {
    this.messageService.clear();
    this.clipboard.copy(textToCopy);
    this.onCopy.emit();
    this.messageService.add({
      severity: 'success',
      summary: 'Sukces!',
      detail: 'Pomyślnie skopiowano adres obrazka!',
    })
  }
}
