import {Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject, merge, mergeMap, Observable, OperatorFunction, scan, switchMap, tap} from 'rxjs';
import { map } from 'rxjs/operators';
import { PictureService } from '../../services/data-access/picture/picture.service';
import { PictureDto } from '../../shared/utility/dtos/PictureDto';
import {PostCardComponent} from "../../shared/components/post-card/post-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {
  CreateAccountBannerComponent
} from "../../shared/components/create-account-banner/create-account-banner.component";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {PictureLikesService} from "../../services/data-access/picture/picture-likes.service";

@Component({
  selector: 'pp-home',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [
    PostCardComponent,
    AsyncPipe,
    NgForOf,
    CreateAccountBannerComponent
  ],
  animations: [
    fadeInAnimation
  ]
})
export class HomeComponent implements OnInit {
  pictures$!: Observable<PictureDto[]>;

  private pageSize = 2;
  private pageNumber = 1;
  private items: PictureDto[] = [];
  private bottomDetectEnabled = true;

  private scrollSubject = new BehaviorSubject<void>(undefined);

  constructor(
    private pictureService: PictureService,
    private pictureLikesService: PictureLikesService
  ) {

    // this.pictureLikesService.getLikedPictureObservable().subscribe((likedPicture) => {
    //   this.items = this.items.map((picture) =>
    //     picture.id === likedPicture.id ? likedPicture : picture
    //   );
    // });

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = 200;

    if ((documentHeight - scrollPosition - windowHeight < threshold) && this.bottomDetectEnabled) {
      this.bottomDetectEnabled = false;
      this.scrollSubject.next();
    }
  }

  ngOnInit() {
    this.pictures$ = this.scrollSubject.pipe(
      mergeMap(() =>
        this.pictureService
          .get(this.pageSize, this.pageNumber)
          .pipe(
            map((res) => {
              this.pageNumber = res.page === res.totalPages ? 1 : res.page + 1;
              this.items = [...this.items, ...res.items];
              this.bottomDetectEnabled = true;
              return res.items;
            })
          )
      ),
    );

    // this.pictureLikesService.getLikedPictureObservable().subscribe((likedPicture) => {
    //   this.items = this.items.map((picture) =>
    //     picture.id === likedPicture.id ? likedPicture : picture
    //   );
    // });
  }

}

