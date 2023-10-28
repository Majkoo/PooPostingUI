import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {AccountDto} from "../../utility/dtos/AccountDto";
import {AccountPreviewDto} from "../../utility/dtos/AccountPreviewDto";

@Component({
  selector: 'pp-account-inline-link',
  standalone: true,
    imports: [CommonModule, RouterLink, UrlTransformModule],
  templateUrl: './account-inline-link.component.html',
  styles: [
  ]
})
export class AccountInlineLinkComponent {
  @Input({required: true}) acc!: AccountDto | AccountPreviewDto;
}
