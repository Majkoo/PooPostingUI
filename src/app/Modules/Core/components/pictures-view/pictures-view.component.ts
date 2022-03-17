import {Component, Input, OnInit} from '@angular/core';
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-pictures-view',
  templateUrl: './pictures-view.component.html',
  styleUrls: ['./pictures-view.component.scss']
})
export class PicturesViewComponent implements OnInit{
  @Input() picture!: PictureModel;
  showDetailsFlag: boolean = false;
  showSettingsFlag: boolean = false;

  constructor(
    private configService: ConfigServiceService,
    private scroll: ScrollServiceService,
    private httpService: HttpServiceService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
    this.updateLikes();
  }

  showDetails() {
    this.showDetailsFlag = true;
  }
  showSettings() {
    this.showSettingsFlag = true;
  }

  delete(){
    this.httpService.deletePictureRequest(this.picture.id).subscribe({
      next: () => {
        this.message.add({severity:'warn', summary: 'Sukces', detail: `Obrazek "${this.picture.name}" został usunięty. Zobaczysz efekty po przeładowaniu wyników.`});
      }
    })
    this.showSettingsFlag = false;
  }

  private updateLikes() {
    this.picture.likeCount = this.picture.likes.filter(l => l.isLike).length;
    this.picture.dislikeCount = this.picture.likes.filter(l => !l.isLike).length;
  }

}
