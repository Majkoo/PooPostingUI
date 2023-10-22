import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {PictureDto} from "../../utility/dtos/PictureDto";

@Component({
  selector: 'pp-account-inline-link',
  standalone: true,
    imports: [CommonModule, RouterLink, UrlTransformModule],
  templateUrl: './account-inline-link.component.html',
  styles: [
  ]
})
export class AccountInlineLinkComponent {
  @Input({required: true}) pic!: PictureDto;
}
