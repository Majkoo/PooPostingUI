import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {GetPictureQuery} from "../shared/utility/models/getPictureQuery";
import {SortSearchBy} from "../shared/utility/enums/sortSearchBy";
import { SearchQuery } from '../shared/utility/models/searchQuery';

@Injectable({
  providedIn: 'root'
})
export class HttpParamsServiceService {
  GetPQuery: GetPictureQuery = {
    searchPhrase: "",
    pageNumber: 2,
    pageSize: 2,
    likedTags: ""
  };

  SearchQuery: SearchQuery = {
    searchPhrase: "",
    pageNumber: 1,
    pageSize: 10,
    sortBy: SortSearchBy.MOST_POPULAR,
  }

  setPageNumber(pageNumber: 2 | 3 | 5 | 10): void{
    this.GetPQuery.pageNumber = pageNumber;
  }
  getPageNumber(): number {
    return this.GetPQuery.pageNumber;
  }
  setSearchPageNumber(pageNumber: number): void{
    this.SearchQuery.pageNumber = pageNumber;
  }

  getGetPicParams(pageNumber: number): HttpParams {
    return new HttpParams()
      .set('pageSize', 3)
      .set('pageNumber', pageNumber)
  }

  getGetPersonalizedPicParams(): HttpParams {
    return new HttpParams()
      .set('pageSize', 2)
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
