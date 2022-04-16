import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {PictureModel} from "../../../../../Models/ApiModels/PictureModel";
import {ConfigServiceService} from "../../../../../Services/data/config-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";

@Component({
  selector: 'app-picture-table',
  templateUrl: './picture-table.component.html',
  styleUrls: ['./picture-table.component.scss']
})
export class PictureTableComponent implements OnInit {
  @Input() picture!: PictureModel;
  @Input() isVisitorOwner!: boolean;
  showSettingsFlag: boolean = false;

  constructor(
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
    this.updateLikes();
  }

  showSettings() {
    this.showSettingsFlag = true;
  }

  delete() {
    this.httpService.deletePictureRequest(this.picture.id).subscribe({
      next: () => {
        this.messageService.add({
          severity:'warn',
          summary: 'Sukces',
          detail: `Obrazek "${this.picture.name}" został usunięty. Zobaczysz efekty po przeładowaniu wyników.`});
      }
    })
    this.showSettingsFlag = false;
  }

  private updateLikes() {
    this.picture.likeCount = this.picture.likes.filter(l => l.isLike).length;
    this.picture.dislikeCount = this.picture.likes.filter(l => !l.isLike).length;
  }


}
