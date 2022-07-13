import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {MessageService} from "primeng/api";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {
  @Output() onCopy: EventEmitter<any> = new EventEmitter<any>();
  @Input() id!: string;
  @Input() itemType!: string;
  url: string = "";

  constructor(
    private configService: ConfigServiceService,
    private messageService: MessageService,
    private clipboard: Clipboard,
  ) { }

  ngOnInit() {
    this.url = `${this.configService.getConfig().appWebUrl}/${this.itemType}/${this.id}`;
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
