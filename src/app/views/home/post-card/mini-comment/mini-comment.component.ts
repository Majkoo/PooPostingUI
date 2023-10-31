import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CommentDto} from "../../../../shared/utility/dtos/CommentDto";
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../../../shared/utility/pipes/url-transform/url-transform.module";
import {shortDateFormat} from "../../../../shared/utility/constants";

@Component({
  selector: 'pp-mini-comment',
  standalone: true,
  imports: [CommonModule, RouterLink, UrlTransformModule, NgOptimizedImage],
  templateUrl: './mini-comment.component.html',
  styles: [
  ]
})
export class MiniCommentComponent {
  @Input({required: true}) comm!: CommentDto;
  protected readonly shortDateFormat = shortDateFormat;
}
