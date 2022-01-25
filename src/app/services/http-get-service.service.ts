import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {Picture} from "../../Interfaces/Picture";

@Injectable({
  providedIn: 'root'
})
export class HttpGetServiceService {

  allPicturesBSubject = new BehaviorSubject<Picture[]>([]);

  constructor(private http: HttpClient) {}

  getPictures(): Observable<Picture[]>{
    return this.http
      .get<Picture[]>("https://localhost:5001/api/picture/odata", {observe: 'body'});
  }

}
