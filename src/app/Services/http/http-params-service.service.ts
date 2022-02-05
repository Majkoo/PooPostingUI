import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { GetPQuery } from 'src/app/Models/GetPQuery';
import { SearchQuery } from 'src/app/Models/SearchQuery';

@Injectable({
  providedIn: 'root'
})
export class HttpParamsServiceService {

  constructor() { }

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
    lookFor: "",
    sortBy: ""
  }

  setPageNumber(pageNumber: number): void{
    this.GetPQuery.pageNumber = pageNumber;
  }
  getGetPicParams(): HttpParams {
    let likedTags: string;

    if (this.GetPQuery.likedTags){
      likedTags = this.GetPQuery.likedTags;
    } else {
      likedTags = "default" + Math.random().toString(); // avoiding tag SEO cheating
    }
    return new HttpParams()
      .set('searchPhrase', this.GetPQuery.searchPhrase)
      .set('pageNumber', this.GetPQuery.pageNumber)
      .set('pageSize', this.GetPQuery.pageSize)
      .set('likedTags', likedTags);
  }

}
