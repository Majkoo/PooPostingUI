import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedResult} from "../../../shared/utility/dtos/PagedResult";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PictureLikesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // getPictureLikes(id: string, pageSize: number, pageNumber: number): Observable<PagedResult<Like>> {
  //   return this.httpClient
  //     .get<LikeDtoPaged>(
  //       `${environment.picturesApiUrl}/picture/${id}/like`,
  //       {
  //         params: new HttpParams()
  //           .set("PageSize", pageSize)
  //           .set("PageNumber", pageNumber),
  //         responseType: "json"
  //       }
  //     );
  // }

  likePicture(id: string): Observable<PictureDto> {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.apiUrl}/picture/${id}/like/vote-up`,
        {},
        { responseType: "json" }
      );
  }
  dislikePicture(id: string): Observable<PictureDto> {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.apiUrl}/picture/${id}/like/vote-down`,
        {},
        { responseType: "json" }
      );
  }
}
