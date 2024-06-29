import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, shareReplay, startWith, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {PictureService} from "../../services/api/picture/picture.service";
import {PictureLikesService} from "../../services/api/picture/picture-likes.service";
import {CommentService} from "../../services/api/comment/comment.service";
import {PagedResult} from "../../shared/utility/dtos/PagedResult";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public triggerCall = new BehaviorSubject<null>(null);
  public canFetchPictures = true;

  private pageSize = 4;
  private pageNumber = 1;

  private pictureService = inject(PictureService);
  private pictureLikesService = inject(PictureLikesService);
  private commentService = inject(CommentService)

  private picturesAggregated: PictureDto[] = [];

  scrollWithPictures$ = this.triggerCall
    .pipe(
      switchMap(() => this.getPictures(this.pageSize, this.pageNumber))
    );
  likedPicture$ = this.pictureLikesService.likedPicture$
    .pipe(
      startWith(null)
    );
  updatedPicture$ = this.pictureService.updatedPicture$
    .pipe(
      startWith(null)
    );
  commentAdded$ = this.commentService.addedComment$
    .pipe(
      startWith(null)
    );

  pictures$ = combineLatest([
    this.scrollWithPictures$,
    this.likedPicture$,
    this.updatedPicture$,
    this.commentAdded$
  ]).pipe(
    shareReplay(),
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


  private getPictures = (pageSize: number, pageNumber: number) => {
    return this.pictureService.get(pageSize, pageNumber).pipe(
      map((res: PagedResult<PictureDto>) => {
        this.pageNumber = res.page === res.totalPages ? 1 : res.page + 1;
        this.picturesAggregated = [...this.picturesAggregated, ...res.items];
        this.canFetchPictures = true;
        return this.picturesAggregated;
      }),
    );
  };

}
