import {Component, Input, OnInit} from '@angular/core';
import { PictureModel } from 'src/app/Models/ApiModels/Get/PictureModel';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.scss']
})
export class PicturePreviewComponent implements OnInit {
  @Input() picture!: PictureModel;
  // change this to input
  isLoggedOn: boolean = false;

  constructor(
    private userDataService: UserDataServiceService,
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private scrollService: ScrollServiceService,
  ) {
    this.isLoggedOn = this.userDataService.isUserLoggedOn();
  }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesApiUrl + "/" + this.picture.url;
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

  likeObserver = {
    next: (v: PictureModel) => {
      this.picture = v;
    },
  }

  saveScrollState() {
    this.scrollService.saveScrollState();
  }

}
