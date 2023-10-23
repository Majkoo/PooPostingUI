import {Component, inject, Input, OnDestroy} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {PictureLikesService} from "../../../services/data-access/picture/picture-likes.service";
import {Subscription} from "rxjs";
import {fadeInAnimation} from "../../utility/animations/fadeInAnimation";
import {likeStateAnimation} from "../../utility/animations/likeStateAnimation";
import {LikeBtnComponent} from "../like-btn/like-btn.component";

@Component({
  selector: 'pp-post-card',
  templateUrl: './post-card.component.html',
  styles: [`
  .lh {
    line-height: 100% !important;
  }
  `
  ],
  imports: [
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    UrlTransformModule,
    NgClass,
    DatePipe,
    LikeBtnComponent
  ],
  animations: [
    fadeInAnimation,
  ],
  standalone: true
})
export class PostCardComponent {
  @Input() pic?: PictureDto;
  private router = inject(Router);
  async openModal(pic: PictureDto) {
    await this.router.navigate([], { queryParams: {viewPicture: pic.id}});
  }
}
