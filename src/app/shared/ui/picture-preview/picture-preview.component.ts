import {Component, Input, OnInit} from '@angular/core';
import {PictureDetailsServiceService} from "../../state/picture-details-service.service";
import {PictureLikesService} from "../../../data-access/picture/picture-likes.service";
import {PictureDto} from "../../utility/dtos/PictureDto";

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.scss']
})
export class PicturePreviewComponent implements OnInit {
  @Input() picture!: PictureDto;
  @Input() isLoggedOn!: boolean;
  isDeleted = false;

  showShare = false;

  constructor(
    private pictureDetailsService: PictureDetailsServiceService,
    private likeService: PictureLikesService
  ) { }

  ngOnInit(): void {
    this.pictureDetailsService.pictureDeletedSubject.subscribe({
      next: (val: string) => {
        if (val === this.picture.id) {
          this.isDeleted = true;
        }
      }
    })
    this.pictureDetailsService.pictureChangedSubject.subscribe({
      next: (val: PictureDto) => {
        if (val.id === this.picture.id) {
          this.picture = val;
        }
      }
    });
  }


  like(){
    this.likeService.likePicture(this.picture.id)
      .subscribe(this.likeObserver)
  }
  dislike(){
    this.likeService.dislikePicture(this.picture.id)
      .subscribe(this.likeObserver)
  }

  likeObserver = {
    next: (v: PictureDto) => {
      this.picture = v;
    },
  }

  showDetails() {
    this.pictureDetailsService.modalTriggerSubject.next(this.picture.id);
  }



}
