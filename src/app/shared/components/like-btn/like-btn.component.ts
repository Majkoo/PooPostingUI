import {Component, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {Subscription} from "rxjs";
import {PictureLikesService} from "../../../services/data-access/picture/picture-likes.service";
import {likeStateAnimation} from "../../utility/animations/likeStateAnimation";

@Component({
  selector: 'pp-like-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-btn.component.html',
  animations: [
    likeStateAnimation
  ]
})
export class LikeBtnComponent implements OnDestroy {
  @Input() cssClass?: string;
  @Input({required: true}) pic!: PictureDto;
  @Output() picChange: EventEmitter<PictureDto> = new EventEmitter<PictureDto>();

  private sub = new Subscription();
  private likeService = inject(PictureLikesService);

  like(id: string) {
    this.sub.add(
      this.likeService.likePicture(id).subscribe({
        next: (result: PictureDto) => {
          this.pic = result;
          this.likeService.emitLikedPicture(result);
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
