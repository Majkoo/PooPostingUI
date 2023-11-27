import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../../../../shared/utility/pipes/url-transform/url-transform.module";
import {AccountDto} from "../../../../../shared/utility/dtos/AccountDto";
import {AccountPreviewDto} from "../../../../../shared/utility/dtos/AccountPreviewDto";

@Component({
  selector: 'pp-account-inline-link',
  standalone: true,
    imports: [CommonModule, RouterLink, UrlTransformModule],
  templateUrl: './comment-account-inline-link.component.html',
  styles: [
  ]
})
export class CommentAccountInlineLinkComponent {
  @Input({required: true}) acc!: AccountDto | AccountPreviewDto;
}
