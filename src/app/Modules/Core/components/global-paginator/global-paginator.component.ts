import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-global-paginator',
  templateUrl: './global-paginator.component.html',
  styleUrls: ['./global-paginator.component.scss']
})
export class GlobalPaginatorComponent implements OnInit {
  @Input() totalItems!: number;
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();

  totalPages!: number;
  pagesToShow: number[] = [];

  constructor() {}

  ngOnInit() {
    if(!this.currentPage) {
      this.currentPage = 0;
    }
    if(!this.pageSize) {
      this.pageSize = 10;
    }
    this.totalPages = Math.floor(this.totalItems / this.pageSize);
    this.calcPagesToShow();
  }

  updatePages(totalItems: number) {
    this.totalPages = this.totalPages = Math.ceil( totalItems / this.pageSize) - 1;
    this.calcPagesToShow();
  }
  updateCurrentPage(currentPage: number) {
    this.currentPage = currentPage-1;
    this.calcPagesToShow();
  }

  paginate(val: number) {
    this.currentPage = val-1;
    this.calcPagesToShow();
    this.onPaginate.emit(this.currentPage);
  }
  paginateLeft() {
    this.currentPage -= 1;
    this.calcPagesToShow();
    this.onPaginate.emit(this.currentPage);
  }
  paginateLeftMax() {
    this.currentPage = 0;
    this.calcPagesToShow();
    this.onPaginate.emit(this.currentPage);
  }
  paginateRight() {
    this.currentPage += 1;
    this.calcPagesToShow();
    this.onPaginate.emit(this.currentPage);
  }
  paginateRightMax() {
    this.currentPage = this.totalPages;
    this.calcPagesToShow();
    this.onPaginate.emit(this.currentPage);
  }

  private calcPagesToShow() {
    let current = this.currentPage;
    this.pagesToShow = [];
    if (this.totalPages < 5) {
      for (let i = 0; i <= this.totalPages; i++) {
        this.pagesToShow.push(i)
      }
    } else {
      for (let i = 0; i < 5; i++) {
        switch (current) {
          case 0: {
            this.pagesToShow.push(i+current);
            break;
          }
          case 1: {
            this.pagesToShow.push(i+current-1);
            break;
          }
          case this.totalPages - 1: {
            this.pagesToShow.push(i+current-3);
            break;
          }
          case this.totalPages: {
            this.pagesToShow.push(i+current-4);
            break;
          }
          default: {
            this.pagesToShow.push(i+current-2)
            break;
          }
        }
      }
    }
  }

}
