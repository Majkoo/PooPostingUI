import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AuthServiceService} from "./singletons/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class HttpHeadersServiceService {

  constructor(
    private auth: AuthServiceService) { }

  getAuthHeader(): HttpHeaders{
    return new HttpHeaders()
      .set('Authorization', "Bearer " + this.auth.getAuthToken())
  }

}
