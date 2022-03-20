import {Component, OnInit, ViewChild,} from '@angular/core';
import { PicturePagedResult } from 'src/app/Models/ApiModels/PicturePagedResult';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {LikeModel} from "../../../../Models/ApiModels/LikeModel";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @ViewChild('customPaginator') paginator: any;
  result: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems: 0
  }
  page!: number;

  constructor(
    private httpService: HttpServiceService,
    private paramsService: HttpParamsServiceService,
    private authService: AuthServiceService,
    private scrollService: ScrollServiceService
  ) { }

  ngOnInit(): void {
    this.updateLikes();
    this.fetchPictures();
    this.updatePage();
    this.paramsService.setPageNumber(this.page);
  }

  paginate(val: any): void {
    this.updateLikes();
    this.paramsService.setPageNumber(val+1);
    this.updatePage();
    this.fetchPictures();
  }
  scroll(top: number) {
    this.scrollService.scroll(top);
  }
  private fetchPictures(): void {
    this.httpService.getPicturesRequest().subscribe({
      next: (value: PicturePagedResult) => {
        this.result = value;
        this.scrollService.scroll(0);
        this.paginator.updateCurrentPage(this.page);
        this.paginator.updatePages(value.totalItems);
      }
    });
  }
  private updateLikes(): void {
    if (this.authService.isUserLogged()){
      this.httpService.getAccountLikesRequest(this.authService.UserInfo?.accountDto.id)
        .subscribe({
          next: (value: LikeModel[]) => {
            this.authService.UserInfo!.likes = value;
          }
        });
    }
  }
  private updatePage(): void {
    this.page = this.paramsService.getPageNumber();
  }

}

