import {Component, OnInit} from '@angular/core';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";
import {Title} from "@angular/platform-browser";
import {PictureModel} from "../../../../Models/ApiModels/Get/PictureModel";
import {CacheServiceService} from "../../../../Services/data/cache-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  pictures: PictureModel[] = [];
  isLoggedOn: boolean = false;

  constructor(
    private httpService: HttpServiceService,
    private cacheService: CacheServiceService,
    private scrollService: ScrollServiceService,
    private title: Title
  ) {
    this.title.setTitle('PicturesUI - Strona główna');
  }

  ngOnInit() {
    this.isLoggedOn = this.cacheService.getUserLoggedOnState();
    if (this.cacheService.arePicturesCached()) {
      this.pictures = this.cacheService.getCachedPictures();
      this.cacheService.purgeCachePictures();
      this.fetchPictures();
    } else {
      this.fetchPictures();
    }

    this.scrollService.bottomSubject
      .subscribe({
        next: (v: boolean) => {
          if (v) {
            this.fetchPictures();
          }
        }
      });
  }

  fetchPictures(): void {
    this.httpService.getPersonalizedPicturesRequest().subscribe({
      next: (value: PictureModel[]) => {
        let loadedItems: PictureModel[] = this.pictures;
        value.forEach((pic: PictureModel) => {
          loadedItems.push(pic);
        });
        this.pictures = loadedItems;
        this.scrollService.bottomSubject.next(false);
      }
    });
  }


}

