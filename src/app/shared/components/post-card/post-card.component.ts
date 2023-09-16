import {Component, inject, Input} from '@angular/core';
import {Location, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";

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
    NgForOf
  ],
  standalone: true
})
export class PostCardComponent {
  @Input() pic?: PictureDto;

  private location = inject(Location);

  openModal(pic: PictureDto) {
    this.location.go(`?viewPicture=${pic.id}`);
  }

}
