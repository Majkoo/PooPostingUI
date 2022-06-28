import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { GetPQuery } from 'src/app/Models/QueryModels/GetPQuery';
import { SearchQuery } from 'src/app/Models/QueryModels/SearchQuery';
import { SortSearchBy } from 'src/app/Enums/SortSearchBy';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpParamsServiceService {
  currentPaginatorState: number | null = null;

  searchPicPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  searchAccPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor() {}

  GetPQuery: GetPQuery = {
    searchPhrase: "",
    pageNumber: 1,
    pageSize: 2,
    likedTags: ""
  };

  SearchQuery: SearchQuery = {
    searchPhrase: "",
    pageNumber: 1,
    pageSize: 10,
    sortBy: SortSearchBy.MOST_POPULAR,
  }

  setPageNumber(pageNumber: number): void{
    this.GetPQuery.pageNumber = pageNumber;
  }
  getPageNumber(): number {
    return this.GetPQuery.pageNumber;
  }
  setSearchPageNumber(pageNumber: number): void{
    this.SearchQuery.pageNumber = pageNumber;
  }

  getGetPicParams(): HttpParams {
    return new HttpParams()
      .set('pageSize', this.GetPQuery.pageSize)
  }

  getSearchPicParams(): HttpParams {
    return new HttpParams()
      .set('searchPhrase', this.SearchQuery.searchPhrase)
      .set('pageNumber', this.SearchQuery.pageNumber)
      .set('pageSize', this.SearchQuery.pageSize)
      .set('searchBy', this.SearchQuery.sortBy!.toString());
  }

  getSearchAccParams(): HttpParams {
    return new HttpParams()
      .set('searchPhrase', this.SearchQuery.searchPhrase)
      .set('pageNumber', this.SearchQuery.pageNumber)
      .set('pageSize', this.SearchQuery.pageSize)
  }

}
