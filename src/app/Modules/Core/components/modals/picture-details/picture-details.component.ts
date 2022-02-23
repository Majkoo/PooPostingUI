import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit{
  @Input() picture!: Picture;
  @Input() isLoggedOn: boolean = false;

  constructor(
    private auth: AuthServiceService,
    private httpService: HttpServiceService,
  ) { }
  ngOnInit() {
    this.updateLikes();
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
    next: () => {
      this.httpService.getPictureRequest(this.picture.id).subscribe({
        next: (value) => {
          this.picture.likes = value.likes;
          this.updateLikes();
        }
      })
    },
    error: (err: HttpErrorResponse) => {
      console.error(err)
    }
  }

  private updateLikes() {
    this.picture.likeCount = this.picture.likes.filter(l => l.isLike).length;
    this.picture.dislikeCount = this.picture.likes.filter(l => !l.isLike).length;
    this.picture.isLiked = this.picture.likes.some(
      (l) =>
        (l.accountId == this.auth.getUserInfo().accountDto.id) &&
        (l.isLike)
    );
    this.picture.isDisliked = this.picture.likes.some(
      (l) =>
        (l.accountId == this.auth.getUserInfo().accountDto.id) &&
        (!l.isLike)
    );
  }

}
