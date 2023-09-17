import {Component, inject, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";

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
    UrlTransformModule
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
