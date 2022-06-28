import {Component, Input, OnInit} from '@angular/core';
import { PictureModel } from 'src/app/Models/ApiModels/Get/PictureModel';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {CacheServiceService} from "../../../../Services/data/cache-service.service";

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.scss']
})
export class PicturePreviewComponent {
  @Input() picture!: PictureModel;
  @Input() isLoggedOn!: boolean;

  constructor(
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private cacheService: CacheServiceService,
  ) { }

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

}
