import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PictureDtoPaged} from "../../shared/utility/dtos/PictureDtoPaged";

@Injectable({
  providedIn: 'root'
})
export class AccountPicturesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPostedPictures(accId: string, pageSize: number, pageNumber: number): Observable<PictureDtoPaged> {
    return this.httpClient
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/account/${accId}/picture/posted`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
        }
      );
  }

  getLikedPictures(accId: string, pageSize: number, pageNumber: number): Observable<PictureDtoPaged> {
    return this.httpClient
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/account/${accId}/picture/liked`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
        }
      );
  }


}
