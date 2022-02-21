import {Component, Input, OnInit} from '@angular/core';
import { Picture } from 'src/app/Models/Picture';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {LikeModel} from "../../../../Models/LikeModel";
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {Router} from "@angular/router";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() picture!: Picture;
  showDetailsFlag: boolean = false;
  IsUserLoggedOn?: boolean;

  constructor(
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private auth: AuthServiceService,
    private scroll: ScrollServiceService,
  ) {
    this.IsUserLoggedOn = this.auth.isUserLogged();
  }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
  }

  like(){
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe({
        next: (value) => {
          this.httpService.getPictureRequest(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
  }
  dislike(){
    this.httpService.patchPictureDislikeRequest(this.picture.id)
      .subscribe({
        next: (value) => {
          this.httpService.getPictureRequest(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
  }


  showDetails() {
    this.scroll.disableScroll()
    this.showDetailsFlag = true;
  }
  enableScroll() {
    this.scroll.enableScroll()
  }
}
