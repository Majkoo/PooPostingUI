import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HttpGetServiceService} from "../../services/http-get-service.service";
import {PicturePagedResult} from "../../../Models/PicturePagedResult";
import {Observable} from "rxjs";


@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @ViewChild('paginatorTop') paginatorTop: any;
  @ViewChild('paginatorBottom') paginatorBottom: any;

  pagesArr: string[] = [];

  token: string | undefined;
  result: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems:0
  }

  constructor(private get: HttpGetServiceService) {}

  ngOnInit(): void {
    this.fetchPictures();

  }

  // kinda clunky solution
  pageTop(val: any) {
    this.get.setPNumber(val.pageIndex+1);
    this.fetchPictures();
    this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
    this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
  }
  pageBottom(val: any){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.get.setPNumber(val.pageIndex+1);
    this.fetchPictures();
    this.paginatorTop.pageIndex = this.paginatorBottom.pageIndex;
    this.paginatorTop.pageSize = this.paginatorBottom.pageSize;
  }

  private fetchPictures(){
    this.get.getPictures().subscribe({
      next: (value) => {
        this.result.items = value.items;
        this.result.page = value.page;
        this.result.pageSize = value.pageSize;
        this.result.totalItems = value.totalItems;
      },
      error: (err) => console.error(err),
    });
  }
}
