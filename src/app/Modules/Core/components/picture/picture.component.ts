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
  // isLiked: boolean = false;
  // isDisliked: boolean = false;
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
    // if(this.IsUserLoggedOn){
    //   let likes = this.auth.getUserInfo().likes;
    //   if(likes.some((l: LikeModel) => (l.pictureId === this.picture.id) && l.isLike)) {
    //     this.isLiked = true;
    //   }
    //   if(likes.some((l: LikeModel) => (l.pictureId === this.picture.id) && !l.isLike)) {
    //     this.isDisliked = true;
    //   }
    // }
  }


  like(){
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe({
        next: (value) => {
          this.httpService.getPictureLikesRequest(this.picture.id).subscribe({
            next: (value) => {
              let likes: number = 0;
              let dislikes: number = 0;

              for (let i = 0; i < value.length; i++){
                if(value[i].isLike){
                  likes++;
                } else {
                  dislikes++;
                }
              }

              // this.isLiked = !this.isLiked;
              // if(this.isLiked && this.isDisliked){
              //   this.isDisliked = false;
              // }
              this.picture.likes = likes;
              this.picture.dislikes = dislikes;
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
              // this.isDisliked = !this.isDisliked;
              // if(this.isLiked && this.isDisliked){
              //   this.isLiked= false;
              // }
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
