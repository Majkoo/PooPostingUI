import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpGetServiceService} from "../../services/http-get-service.service";
import {PicturePagedResult} from "../../../Models/PicturePagedResult";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  pagesArr: string[] = [];

  token: string | undefined;
  result: PicturePagedResult = {
    items:[],
    page:0,
    totalPages:0
  }


  constructor(private httpGetService: HttpGetServiceService) {}

  ngOnInit(): void {
    this.httpGetService.getPictures().subscribe({
      next: (value) => {
      this.result.items = value.items;
      this.result.page = value.page;
      this.result.totalPages = value.totalPages;
      this.pagesArr = HomepageComponent.calcPagination(this.result.totalPages, this.result.page);
      },
      error: (err) => console.error(err),
    });
  }


  // change this
  private static calcPagination(totalPages: number, page: number): string[]{
    let pages = []
    if(totalPages > 5) {
      for (let i = page; i < page+4; i++) {
        pages.push((i).toString());
      }
      pages.push("...")
      for (let i = totalPages; i < totalPages+1; i++) {
        pages.push((i).toString());
      }
    } else if (totalPages > 1){
      for (let i = page; i < totalPages+1; i++){
        pages.push((i).toString())
      }
    } else {
      pages.push('1');
    }
    return pages;
  }


}
