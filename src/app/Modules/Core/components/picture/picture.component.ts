import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { PictureModel } from 'src/app/Models/ApiModels/PictureModel';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() picture!: PictureModel;
  showDetailsFlag: boolean = false;
  showSettingsFlag: boolean = false;
  showAdminSettingsFlag: boolean = false;
  isLoggedOn: boolean = false;

  constructor(
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private auth: AuthServiceService,
    private scroll: ScrollServiceService,
    private http: HttpServiceService,
    private message: MessageService,
  ) {
    this.isLoggedOn = this.auth.isUserLogged();
  }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
    this.updatePicture();
  }

  showDetails() {
    this.showDetailsFlag = true;
  }
  showSettings() {
    if (this.auth.getUserInfo().accountDto.id === this.picture.accountId) {
      this.showSettingsFlag = true;
    } else {
      this.showAdminSettingsFlag = true;
    }
  }

  like(){
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  dislike(){
    this.httpService.patchPictureDislikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  updatePicture() {
    this.picture = this.auth.updatePictureLikes(this.picture);
  }

  delete(){
    this.http.deletePictureRequest(this.picture.id).subscribe({
      next: () => {
        this.showAdminSettingsFlag = false;
        this.message.add({severity:'warn', summary: 'Sukces', detail: `Obrazek "${this.picture.name}" został usunięty. Zobaczysz efekty po przeładowaniu wyników.`});
      }
    })
    this.showSettingsFlag = false;
  }

  likeObserver = {
    next: () => {
      this.httpService.getPictureRequest(this.picture.id).subscribe({
        next: (value:PictureModel) => {
          this.picture.likes = value.likes;
          this.updatePicture();
        }
      })
    },
  }

}
