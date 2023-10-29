import {Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {fadeInAnimation} from "../../utility/animations/fadeInAnimation";
import {LikeBtnComponent} from "../like-btn/like-btn.component";
import {TagComponent} from "../tag/tag.component";
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
}
