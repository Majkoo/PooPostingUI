import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PopularDto} from "../../shared/utility/dtos/PopularDto";

@Injectable({
  providedIn: 'root'
})
export class PopularService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPopularPictures(): Observable<PopularDto> {
    return this.httpClient
      .get<PopularDto>(
        `${environment.picturesApiUrl}/popular`,
        { responseType: "json" }
      );
  }
}
