import { Component, OnInit } from '@angular/core';
import {PopularModel} from "../../../../Models/ApiModels/PopularModel";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {PicturePagedResult} from "../../../../Models/ApiModels/PicturePagedResult";
import {AccountPagedResult} from "../../../../Models/ApiModels/AccountPagedResult";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {SelectOption} from "../../../../Models/SelectOption";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  popular: PopularModel = {
    MostCommentedPics: [],
    MostLikedPics: [],
    MostVotedPics: [],
    MostLikedAccs: [],
    MostPicAccs: [],
  };
  selectOptions: SelectOption[];
  selectValue: SelectOption;
  accountOptions: SelectOption[];
  accountValue: SelectOption;
  pictureOptions: SelectOption[];
  pictureValue: SelectOption;

  responsiveOptions = [
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private httpService: HttpServiceService,
    private configService: ConfigServiceService,
    private authService: AuthServiceService,
  ) {
    this.selectOptions = [
      { name: "Obrazki", class: "bi bi-image-fill"},
      { name: "Konta", class: "bi bi-person-fill"},
    ];
    this.selectValue = this.selectOptions[0];
    this.accountOptions = [
      { name: "Lajków", class: "bi bi-hand-thumbs-up"},
      { name: "Postów", class: "bi bi-graph-up-arrow"},
    ]
    this.accountValue = this.accountOptions[0];
    this.pictureOptions = [
      { name: "Komentowane", class: "bi bi-chat-right-text"},
      { name: "Lajkowane", class: "bi bi-hand-thumbs-up"},
      { name: "Oceniane", class: "bi bi-star"},
    ]
    this.pictureValue = this.pictureOptions[1];
  }

  ngOnInit(): void {
    this.httpService.getPicturesRequest().subscribe({
      next: (val: PicturePagedResult) => {
        this.popular.MostVotedPics = val.items.slice(0,5);
        this.popular.MostCommentedPics = val.items.slice(0,5);
        this.popular.MostLikedPics = val.items.slice(0,5);

        this.popular.MostVotedPics.forEach(p => this.updatePicture(p));
        this.popular.MostCommentedPics.forEach(p => this.updatePicture(p));
        this.popular.MostLikedPics.forEach(p => this.updatePicture(p));
      }
    });
    this.httpService.searchAccountsRequest().subscribe({
      next: (val: AccountPagedResult) => {
        this.popular.MostLikedAccs = val.items.slice(0,5);
        this.popular.MostPicAccs = val.items.slice(0,5);
      }
    })
  }

  updatePicture(picture: PictureModel): void {
    picture = this.authService.updatePictureLikes(picture);
    if(!picture.url.startsWith("http")){
      picture.url = this.configService.picturesUrl + picture.url;
    }
  }
}
