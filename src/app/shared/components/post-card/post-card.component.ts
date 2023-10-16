import {Component, inject, Input, OnDestroy} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PictureDto} from "../../utility/dtos/PictureDto";
import {UrlTransformModule} from "../../utility/pipes/url-transform/url-transform.module";
import {PictureLikesService} from "../../../services/data-access/picture/picture-likes.service";
import {Subscription} from "rxjs";

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
    DatePipe
  ],
  standalone: true
})
export class PostCardComponent implements OnDestroy {
  @Input() pic?: PictureDto;

  private router = inject(Router);
  private likeService = inject(PictureLikesService);
  private sub = new Subscription();

  async openModal(pic: PictureDto) {
    await this.router.navigate([], { queryParams: {viewPicture: pic.id}});
  }

  like(id: string) {
    this.sub.add(
      this.likeService.likePicture(id).subscribe({
        next: (result: PictureDto) => {
          this.pic = result;
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
