import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpServiceService} from "../../services/http/http-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpParamsServiceService} from "../../services/http/http-params-service.service";
import { PicturePagedResult } from 'src/app/Models/PicturePagedResult';


@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @ViewChild('paginatorTop') paginatorTop: any;
  @ViewChild('paginatorBottom') paginatorBottom: any;

  result: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems:0
  }

  constructor(
    private httpService: HttpServiceService,
    private params: HttpParamsServiceService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchPictures();
  }

  // kinda rusty solution
  pageTop(val: any) {
    this.params.setPageNumber(val.pageIndex+1);
    this.fetchPictures();
    this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
    this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
  }
  pageBottom(val: any) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.params.setPageNumber(val.pageIndex+1);
    this.fetchPictures();
    this.paginatorTop.pageIndex = this.paginatorBottom.pageIndex;
    this.paginatorTop.pageSize = this.paginatorBottom.pageSize;
  }

  private fetchPictures(){
    this.httpService.getPicturesRequest().subscribe({
      next: (value: PicturePagedResult) => {
        this.result = value;
        this.paginatorTop.pageIndex = value.page-1;
        this.paginatorBottom.pageIndex = value.page-1;
      },
      error: (err: HttpErrorResponse) => {
        // this.router.navigate(['./error500']);
      }
    });
  }

}
