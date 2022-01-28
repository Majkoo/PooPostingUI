import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {map, Observable, Subscription, tap} from "rxjs";
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


  private static calcPagination(totalPages: number, page: number): string[]{
    let pages = []
    if(totalPages > 6) {
      for (let i = page; i < page+3; i++) {
        pages.push((i+1).toString());
      }
      pages.push("...")
      for (let i = totalPages-3; i < totalPages; i++) {
        pages.push((i+1).toString());
      }
    } else if (totalPages > 1){
      for (let i = page; i < totalPages; i++){
        pages.push((i+1).toString())
      }
    } else {
      pages.push('tylko jedna strona obrazków do wyświetlenia :(');
    }
    return pages;
  }

}
