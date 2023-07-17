import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ScrollServiceService} from "../../../../shared/helpers/scroll-service.service";
import {AppCacheService} from "../../../../shared/state/app-cache.service";
import {PictureService} from "../../../../data-access/picture/picture.service";
import {PictureDto} from "../../../../shared/utility/dtos/PictureDto";
import {HomePageOption} from "../../../../shared/utility/enums/homePageOption";
import {PictureDtoPaged} from "../../../../shared/utility/dtos/PictureDtoPaged";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit, OnDestroy {
  items: (PictureDto)[] = [];
  isLoggedOn = false;
  pictureFetchingOption?: HomePageOption;

  private readonly subs = new Subscription();

  constructor(
    private pictureService: PictureService,
    private cacheService: AppCacheService,
    private scrollService: ScrollServiceService,
  ) {
  }

  ngOnInit() {
    this.isLoggedOn = this.cacheService.getUserLoggedOnState();
    this.pictureFetchingOption = this.isLoggedOn ? HomePageOption.PERSONALIZED : HomePageOption.MOST_POPULAR;
    this.items = this.cacheService.getCachedPictures();
    this.cacheService.purgeCachePictures();
    this.fetchPictures();

    this.subs.add(
      this.scrollService.bottomSubject
      .subscribe({
        next: (v: boolean) => {
          if (v) this.fetchPictures()
        }})
    );

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  fetchPictures(): void {

    switch (this.pictureFetchingOption) {

      case HomePageOption.PERSONALIZED:
        this.subs.add(
          this.pictureService.getPersonalizedPictures(2)
            .subscribe({
              next: (value: PictureDtoPaged) => {
                if (value.items?.length !== 0 && value.items) {
                  value.items.forEach((pic: PictureDto) => this.items.push(pic)
                  );
                  this.scrollService.bottomSubject.next(false);
                  return;
                } else {
                  this.pictureFetchingOption = HomePageOption.MOST_POPULAR;
                  this.fetchPictures();
                }
              }
            })
        );
        break;

      case HomePageOption.MOST_POPULAR:
        this.subs.add(
          this.pictureService.getPictures(2, this.cacheService.mostPopularSite)
            .subscribe({
              next: (value: PictureDtoPaged) => {
                if (value.items?.length) {
                  value.items.forEach((pic: PictureDto) => {
                    this.items.push(pic);
                  });
                  this.cacheService.mostPopularSite = value.page+1;
                  this.scrollService.bottomSubject.next(false);
                } else {
                  this.cacheService.mostPopularSite = 1;
                  if (value.items?.length) this.fetchPictures();

                }
              }
            })
        );
        break;

    }
  }

}

