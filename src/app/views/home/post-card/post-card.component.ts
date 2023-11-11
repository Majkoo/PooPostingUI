import {Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {UrlTransformModule} from "../../../shared/utility/pipes/url-transform/url-transform.module";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {LikeBtnComponent} from "../../../shared/components/like-btn/like-btn.component";
import {TagComponent} from "../../../shared/components/tag/tag.component";
import {MiniCommentComponent} from "./mini-comment/mini-comment.component";

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
    LikeBtnComponent,
    TagComponent,
    MiniCommentComponent
  ],
  animations: [
    fadeInAnimation
  ],
  standalone: true
})
export class PostCardComponent {
  @Input() pic?: PictureDto;
  // todo: make a readonly version
}
