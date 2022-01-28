import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigServiceService} from "./singletons/config-service.service";
import {Picture} from "../../Models/Picture";
import {GetPQuery} from "../../Models/GetPQuery";
import {PicturePagedResult} from "../../Models/PicturePagedResult";

@Injectable({
  providedIn: 'root'
})
export class HttpGetServiceService {
  Url: string;
  GetPQuery: GetPQuery = {
    searchPhrase: "",
    pageNumber: 1,
    pageSize: 10,
    likedTags: []
  };

  constructor(private http: HttpClient,
              private configService: ConfigServiceService) {
    this.Url = configService.apiUrl + "picture/";
  }

  getPictures(): Observable<PicturePagedResult> {
    return this.http.get<PicturePagedResult>(this.Url, {observe: 'body', params: this.getPParams()});
  }

  getPicture(id: string): Observable<Picture> {
    return this.http.get<Picture>(this.Url + id, {observe: 'body'});
  }





  private getPParams(): HttpParams {
    return new HttpParams()
      .set('searchPhrase', this.GetPQuery.searchPhrase)
      .set('pageNumber', this.GetPQuery.pageNumber)
      .set('pageSize', this.GetPQuery.pageSize)
      .set('likedTags', this.genLikedTags(this.GetPQuery.likedTags));
  }
  private genLikedTags(tags: string[]): string{
    let result = "["
    tags.forEach(value => {
      result += value + ",";
    })
    result += "]"
    return result;
  }

}
