import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CommentDto} from "../../../utility/dtos/CommentDto";
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../../utility/pipes/url-transform/url-transform.module";
import {shortDateFormat} from "../../../utility/constants";

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
