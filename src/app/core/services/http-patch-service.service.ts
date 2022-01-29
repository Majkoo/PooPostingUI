import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigServiceService} from "./singletons/config-service.service";
import {HttpHeadersServiceService} from "./http-headers-service.service";

@Injectable({
  providedIn: 'root'
})
export class HttpPatchServiceService {

  constructor(
    private http: HttpClient,
    private config: ConfigServiceService,
    private headers: HttpHeadersServiceService) {

  }

  like(id: string) {
    return this.http.patch(this.config.apiUrl + "picture/" + id + "/voteup", {}, {headers: this.headers.getAuthHeader()} )
  }

  dislike(id: string) {
    return this.http.patch(this.config.apiUrl + "picture/" + id + "/votedown", {}, {headers: this.headers.getAuthHeader()} )
  }


}
