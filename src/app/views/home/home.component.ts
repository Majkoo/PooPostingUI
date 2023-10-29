import {Component, HostListener, inject, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, startWith, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import { PictureService } from '../../services/data-access/picture/picture.service';
import { PictureDto } from '../../shared/utility/dtos/PictureDto';
import {PostCardComponent} from "../../shared/components/post-card/post-card.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  CreateAccountBannerComponent
} from "../../shared/components/create-account-banner/create-account-banner.component";
import {PictureLikesService} from "../../services/data-access/picture/picture-likes.service";
import {PagedResult} from "../../shared/utility/dtos/PagedResult";
import {CommentService} from "../../services/data-access/comment/comment.service";
import {AuthService} from "../../services/data-access/account/auth.service";

@Component({
  selector: 'pp-home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [
    PostCardComponent,
    AsyncPipe,
    NgForOf,
    CreateAccountBannerComponent,
    NgIf
  ],
  animations: [
  ]
})
export class HomeComponent implements OnInit {
  pictures$: Observable<PictureDto[]> = new Observable<PictureDto[]>();
  private pictures: PictureDto[] = [];
  private pageSize = 2;
  private pageNumber = 1;
  private bottomDetectEnabled = true;
  private scrollSubject = new BehaviorSubject<null>(null);

  private pictureService = inject(PictureService);
  private pictureLikesService = inject(PictureLikesService);
  private commentService = inject(CommentService)
  private authService = inject(AuthService)

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = 200;

    if (
      documentHeight - scrollPosition - windowHeight < threshold && this.bottomDetectEnabled
    ) {
      this.bottomDetectEnabled = false;
      this.scrollSubject.next(null);
    }
  }

  ngOnInit() {
    const scrollWithPictures$ = this.scrollSubject.pipe(
      switchMap(() => this.getPictures(this.pageSize, this.pageNumber))
    );
    const likedPicture$ = this.pictureLikesService.likedPicture$.pipe(
      startWith(null)
    );
    const updatedPicture$ = this.pictureService.updatedPicture$.pipe(
      startWith(null)
    );
    const commentAdded$ = this.commentService.addedComment$.pipe(
      startWith(null)
    );

    this.pictures$ = combineLatest([
      scrollWithPictures$,
      likedPicture$,
      updatedPicture$,
      commentAdded$
    ]).pipe(
      map(([
        pictures,
        likedPicture,
        updatedPicture,
        commentAdded
        ]) => {
        return pictures.map((picture) => {
          if (likedPicture && picture.id === likedPicture.id) {
            return { ...picture, isLiked: likedPicture.isLiked };
          }
          if (updatedPicture && picture.id === updatedPicture.id) {
            return { ...updatedPicture };
          }
          if (commentAdded && picture.id === commentAdded.pictureId) {
            return { ...picture, comments: [commentAdded, ...picture.comments] };
          }
          return picture;
        });
      })
    );
  }

  private getPictures = (pageSize: number, pageNumber: number) => {
    return this.pictureService.get(pageSize, pageNumber).pipe(
      map((res: PagedResult<PictureDto>) => {
        this.pageNumber = res.page === res.totalPages ? 1 : res.page + 1;
        this.pictures = [...this.pictures, ...res.items];
        this.bottomDetectEnabled = true;
        return this.pictures;
      }),
    );
  };

  trackByPictureId(index: number, picture: PictureDto): string {
    return picture.id;
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
