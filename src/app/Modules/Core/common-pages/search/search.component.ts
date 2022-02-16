import {Component, OnInit, ViewChild} from '@angular/core';
import {PicturePagedResult} from "../../../../Models/PicturePagedResult";
import {Router} from "@angular/router";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {AccountPagedResult} from "../../../../Models/AccountPagedResult";
import {MessageService} from "primeng/api";
import {AuthServiceService} from "../../../../Services/data/auth-service.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  picturesResult: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems:0
  }
  accountsResult: AccountPagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems:0
  }

  constructor(
    private httpService: HttpServiceService,
    private params: HttpParamsServiceService,
    private router: Router,
    private message: MessageService,
    private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.params.setSearchPageNumber(1);
  }

  searchPictures() {
    this.httpService.searchPicturesRequest().subscribe({
      next: (val) => {
        this.picturesResult.items = val.items;
        this.picturesResult.page = val.page;
        this.picturesResult.pageSize = val.pageSize;
        this.picturesResult.totalItems = val.totalItems;
        this.message.add({severity:'success', summary: 'Sukces', detail: `Znaleziono ${val.totalItems} wyników`});
        this.clearAccountsResult();
      },
      error: () => {
        this.message.add({severity:'error', summary: 'Niepowodzenie', detail: `Nie znaleziono żadnych wyników`});
        this.clearSearch();
      }
    });
  }
  searchAccounts() {
    this.httpService.searchAccountsRequest().subscribe({
      next: (val) => {
        this.accountsResult.items = val.items;
        this.accountsResult.page = val.page;
        this.accountsResult.pageSize = val.pageSize;
        this.accountsResult.totalItems = val.totalItems;
        this.message.add({severity:'success', summary: 'Sukces', detail: `Znaleziono ${val.totalItems} wyników`});
        this.clearPictureResult();
      },
      error: () => {
        this.message.add({severity:'error', summary: 'Niepowodzenie', detail: `Nie znaleziono żadnych wyników`});
        this.clearSearch();
      }
    });
  }

  clearSearch() {
    this.clearAccountsResult();
    this.clearPictureResult();
  }
  paginate(val: any): void {
    this.updateLikes();
    this.params.setSearchPageNumber(val.page+1);
    this.fetchPictures();
  }

  private clearPictureResult() {
    this.picturesResult = {
      items:[],
      page:0,
      pageSize: 0,
      totalItems:0
    }
  }
  private clearAccountsResult() {
    this.accountsResult = {
      items:[],
      page:0,
      pageSize: 0,
      totalItems:0
    }
  }

  private updateLikes(): void {
    if (this.auth.isUserLogged()){
      this.httpService.getAccountLikesRequest(this.auth.UserInfo?.accountDto.id)
        .subscribe({
          next: (value) => {
            this.auth.UserInfo!.likes = value;
          }
        });
    }
  }

  private fetchPictures(): void {
    this.httpService.searchPicturesRequest().subscribe({
      next: (val: PicturePagedResult) => {
        this.picturesResult.items = val.items;
        this.picturesResult.page = val.page;
        this.picturesResult.pageSize = val.pageSize;
        this.picturesResult.totalItems = val.totalItems;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    });
  }

}
