import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";

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
      .subscribe({
        next: () => {
          this.httpService.getPictureRequest(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        }
      })
  }

  dislike(){
    this.httpService.patchPictureDislikeRequest(this.picture.id)
      .subscribe({
        next: () => {
          this.httpService.getPictureRequest(this.picture.id).subscribe({
            next: (value) => {
              this.picture.likes = value.likes;
              this.picture.dislikes = value.dislikes;
            }
          })
        }
      })
  }

  updateLikes(): void {
  }

}
