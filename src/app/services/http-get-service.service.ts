import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {Picture} from "../Models/Picture";
import {ConfigServiceService} from "./singletons/config-service.service";

@Injectable({
  providedIn: 'root'
})
export class HttpGetServiceService {
  Url: string;
  constructor(private http: HttpClient,
              private configService: ConfigServiceService) {

    this.Url = configService.apiUrl + "picture/";

  }

  getPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(this.Url + "odata", {observe: 'body'});
  }

  getPicture(id: string): Observable<Picture> {
    return this.http.get<Picture>(this.Url + id, {observe: 'body'});
  }

}
