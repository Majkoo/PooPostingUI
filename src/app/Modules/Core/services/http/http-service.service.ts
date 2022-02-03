import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigServiceService} from "../singletons/config-service.service";
import {Observable, tap, throwError} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import { Picture } from 'src/app/Models/Picture';
import { PicturePagedResult } from 'src/app/Models/PicturePagedResult';
import { LoginModel } from 'src/app/Models/LoginModel';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { RegisterModel } from 'src/app/Models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http: HttpClient,
    private config: ConfigServiceService,
    private params: HttpParamsServiceService) { }

  getPicturesRequest(): Observable<PicturePagedResult>{
    return this.http
      .get<PicturePagedResult>(
        `${this.config.apiUrl}/picture`,
        {params: this.params.getGetPicParams()})
  }
  getPictureRequest(id?: string): Observable<Picture>{
    return this.http.get<Picture>( `${this.config.apiUrl}/picture/${id}`)
  }
  postLoginRequest(data: LoginModel): Observable<UserInfoModel> {
    return this.http.post<UserInfoModel>(`${this.config.apiUrl}/account/login`, data, {responseType: "json",})
  }
  postRegisterRequest(data: RegisterModel): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/account/register`, data, {responseType: "json",})
  }
  postPictureRequest(data: FormData): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/picture/create`, data )
  }
  patchPictureLikeRequest(id: string) {
    return this.http.patch(`${this.config.apiUrl}/picture/${id}/voteup`, {})
  }
  patchPictureDislikeRequest(id: string) {
    return this.http.patch(`${this.config.apiUrl}/picture/${id}/votedown`, {})
  }


}
