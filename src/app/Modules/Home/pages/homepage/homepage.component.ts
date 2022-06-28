import {Component, OnInit} from '@angular/core';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";
import {Title} from "@angular/platform-browser";
import {PictureModel} from "../../../../Models/ApiModels/Get/PictureModel";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  pictures: PictureModel[] = [];

  constructor(
    private httpService: HttpServiceService,
    private userDataService: UserDataServiceService,
    private paramsService: HttpParamsServiceService,
    private scrollService: ScrollServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('PicturesUI - Strona główna');
  }

  ngOnInit() {
    this.fetchPictures();
    this.scrollService.bottomSubject
      .subscribe({
        next: (v) => {
          if (v) {
            this.fetchPictures();
          }
        }
      })
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

