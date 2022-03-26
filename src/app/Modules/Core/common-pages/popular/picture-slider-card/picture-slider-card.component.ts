import {Component, Input, OnInit} from '@angular/core';
import {PictureModel} from "../../../../../Models/ApiModels/PictureModel";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";

@Component({
  selector: 'app-picture-slider-card',
  templateUrl: './picture-slider-card.component.html',
  styleUrls: ['./picture-slider-card.component.scss']
})
export class PictureSliderCardComponent implements OnInit {
  @Input() picture!: PictureModel;
  @Input() index!: number;
  @Input() showCommentCount: boolean = false;
  @Input() showLikeCount: boolean = false;

  constructor(
    private httpService: HttpServiceService,
    private authService: AuthServiceService,
  ) { }

  ngOnInit(): void {
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
    this.picture = this.authService.updatePictureLikes(this.picture);
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
