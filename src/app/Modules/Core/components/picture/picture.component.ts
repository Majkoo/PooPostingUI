import {Component, Input, OnInit} from '@angular/core';
import {ConfigServiceService} from "../../services/singletons/config-service.service";
import {AuthServiceService} from "../../services/singletons/auth-service.service";
import {HttpServiceService} from "../../services/http/http-service.service";
import { Picture } from 'src/app/Models/Picture';
import {LikeModel} from "../../../../Models/LikeModel";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  isLiked: boolean = false;
  isDisliked: boolean = false;
  IsUserLoggedOn?: boolean;
  @Input() picture!: Picture;

  constructor(
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private auth: AuthServiceService
  ) {
    this.IsUserLoggedOn = this.auth.isUserLogged();
  }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
    if(this.IsUserLoggedOn){
      let likes = this.auth.getLikes();
      if(likes.some((l: LikeModel) => (l.pictureId === this.picture.id) && l.isLike)) {
        this.isLiked = true;
      }
      if(likes.some((l: LikeModel) => (l.pictureId === this.picture.id) && !l.isLike)) {
        this.isDisliked = true;
      }
    }
  }


  like(){
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe({
        next: (value) => {
          this.httpService.getPictureRequest(this.picture.id).subscribe({
            next: (value) => {
              this.isLiked = !this.isLiked;
              if(this.isLiked && this.isDisliked){
                this.isDisliked = false;
              }
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
              this.isDisliked = !this.isDisliked;
              if(this.isLiked && this.isDisliked){
                this.isLiked= false;
              }
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

}
