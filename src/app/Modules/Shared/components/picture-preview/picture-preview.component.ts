import {Component, Input, OnInit} from '@angular/core';
import { PictureModel } from 'src/app/Models/ApiModels/PictureModel';
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
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
    this.updatePicture();
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
    this.picture = this.userDataService.updatePictureLikes(this.picture);
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

  saveScrollState() {
    this.scrollService.saveScrollState();
  }

}
