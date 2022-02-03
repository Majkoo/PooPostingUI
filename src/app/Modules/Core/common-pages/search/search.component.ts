import {Component, OnInit, ViewChild} from '@angular/core';
import {PicturePagedResult} from "../../../../Models/PicturePagedResult";
import {HttpServiceService} from "../../services/http/http-service.service";
import {HttpParamsServiceService} from "../../services/http/http-params-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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
  }

  pageTop(val: any) {
    this.params.setPageNumber(val.pageIndex+1);
    this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
    this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
  }
  pageBottom(val: any) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.params.setPageNumber(val.pageIndex+1);
    this.paginatorTop.pageIndex = this.paginatorBottom.pageIndex;
    this.paginatorTop.pageSize = this.paginatorBottom.pageSize;
  }

}
