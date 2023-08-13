import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";

@Component({
  selector: 'pp-post-card',
  templateUrl: './post-card.component.html',
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
}
