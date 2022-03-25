import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { GetPQuery } from 'src/app/Models/GetPQuery';
import { SearchQuery } from 'src/app/Models/SearchQuery';
import { SortSearchBy } from 'src/app/Enums/SortSearchBy';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpParamsServiceService {
  currentPaginatorState: number | null = null;

  homePageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  searchPicPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  searchAccPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);


  constructor() {
    this.homePageSubject.subscribe({
      next: (val) => {
        this.GetPQuery.pageNumber = val;
      }
    });
  }

  GetPQuery: GetPQuery = {
    searchPhrase: "",
    pageNumber: 1,
    pageSize: 10,
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
    let likedTags: string;

    if (this.GetPQuery.likedTags){
      likedTags = this.GetPQuery.likedTags;
    } else {
      likedTags = "default" + Math.random() ; // avoiding tag SEO cheating
    }
    return new HttpParams()
      .set('searchPhrase', this.GetPQuery.searchPhrase)
      .set('pageNumber', this.GetPQuery.pageNumber)
      .set('pageSize', this.GetPQuery.pageSize)
      .set('likedTags', likedTags);
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
