import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccountInlineLinkComponent
} from "../../../../shared/components/account-inline-link/account-inline-link.component";
import {CommentDto} from "../../../../shared/utility/dtos/CommentDto";
import {fadeInOutAnimation} from "../../../../shared/utility/animations/fadeInOutAnimation";
import {shortDateFormat} from "../../../../shared/utility/constants";

@Component({
  selector: 'pp-comment',
  standalone: true,
  imports: [CommonModule, AccountInlineLinkComponent],
  templateUrl: './comment.component.html',
  animations: [
    fadeInOutAnimation
  ]
})
export class CommentComponent {
  @Input({required: true}) comm!: CommentDto;
  protected readonly shortDateFormat = shortDateFormat;
}
