import {Component, Input} from '@angular/core';
import {PictureDto} from "../../../../shared/utility/dtos/PictureDto";
import {LikeResult} from "../../../../shared/utility/dtos/LikeResult";

@Component({
  selector: 'app-picture-slider-card',
  templateUrl: './picture-slider-card.component.html',
  styleUrls: ['./picture-slider-card.component.scss']
})
export class PictureSliderCardComponent {
  @Input() picture!: PictureDto;
  @Input() index!: number;
  @Input() showCommentCount = false;
  @Input() showLikeCount = false;

  constructor(
    // private httpService: HttpServiceService,
  ) { }

  like(){
    // this.httpService.patchPictureLikeRequest(this.picture.id)
    //   .subscribe(this.likeObserver)
  }
  dislike(){
    // this.httpService.patchPictureDislikeRequest(this.picture.id)
    //   .subscribe(this.likeObserver)
  }

  likeObserver = {
    next: (v: LikeResult) => {
      this.picture.likeCount = v.likeCount;
      this.picture.dislikeCount = v.dislikeCount;
      this.picture.likeState = v.likeState;
    },
  }

}
