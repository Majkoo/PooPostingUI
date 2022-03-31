import { Component, OnInit } from '@angular/core';
import {PopularModel} from "../../../../Models/ApiModels/PopularModel";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {SelectOption} from "../../../../Models/SelectOption";
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  popular: PopularModel = {
    mostCommentedPictures: [],
    mostLikedPictures: [],
    mostVotedPictures: [],
    mostLikedAccounts: [],
    mostPostedAccounts: [],
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
    private sessionStorageService: SessionStorageServiceService,
    private httpService: HttpServiceService,
    private configService: ConfigServiceService,
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
    this.httpService.getPopularRequest().subscribe({
      next: (val: PopularModel) => {
        this.popular = val;

        this.popular.mostVotedPictures.forEach(p => this.updatePicture(p));
        this.popular.mostCommentedPictures.forEach(p => this.updatePicture(p));
        this.popular.mostLikedPictures.forEach(p => this.updatePicture(p));
        this.popular.mostLikedAccounts.forEach(p => this.updateAccount(p));
        this.popular.mostPostedAccounts.forEach(p => this.updateAccount(p));
      }
    });
  }

  private updatePicture(picture: PictureModel): void {
    picture = this.sessionStorageService.updatePictureLikes(picture);
    if(!picture.url.startsWith("http")){
      picture.url = this.configService.picturesUrl + picture.url;
    }
  }
  private updateAccount(account: AccountModel): void {
    account.commentCount = 0;
    account.pictures.forEach(p => account.commentCount! += p.comments.length);
    account.likeCount = 0;
    account.pictures.forEach(p => p.likes.forEach(l => l.isLike? account.likeCount!++ : null))
  }
}
