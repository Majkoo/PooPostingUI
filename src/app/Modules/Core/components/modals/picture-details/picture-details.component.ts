import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

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
    this.picture = this.auth.updatePictureLikes(this.picture);
  }

  likeObserver = {
    next: () => {
      this.httpService.getPictureRequest(this.picture.id).subscribe({
        next: (value: Picture) => {
          this.picture.likes = value.likes;
          this.updatePicture();
        }
      })
    },
  }
}
