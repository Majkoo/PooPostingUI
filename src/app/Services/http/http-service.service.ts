import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import { Picture } from 'src/app/Models/Picture';
import { PicturePagedResult } from 'src/app/Models/PicturePagedResult';
import { LoginModel } from 'src/app/Models/LoginModel';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { RegisterModel } from 'src/app/Models/RegisterModel';
import { ConfigServiceService } from '../data/config-service.service';
import {LikeModel} from "../../Models/LikeModel";
import { AccountPagedResult } from 'src/app/Models/AccountPagedResult';
import {AccountModel} from "../../Models/AccountModel";
import {PutPictureModel} from "../../Models/PutPictureModel";

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
      {params: this.params.getGetPicParams()}
    );
  }
  searchPicturesRequest(): Observable<PicturePagedResult>{
    return this.http
      .get<PicturePagedResult>(
        `${this.config.apiUrl}/picture/search`,
        {params: this.params.getSearchPicParams()}
      );
  }
  getPictureRequest(id?: string): Observable<Picture>{
    return this.http
      .get<Picture>(
      `${this.config.apiUrl}/picture/${id}`
    );
  }
  getPictureLikesRequest(id?: string): Observable<LikeModel[]>{
    return this.http
      .get<LikeModel[]>(
        `${this.config.apiUrl}/picture/${id}/likes`
      );
  }
  searchAccountsRequest(): Observable<AccountPagedResult>{
    return this.http
      .get<AccountPagedResult>(
        `${this.config.apiUrl}/account`,
        {params: this.params.getSearchAccParams()}
      );
  }
  getAccountRequest(id: string): Observable<AccountModel>{
    return this.http
      .get<AccountModel>(
        `${this.config.apiUrl}/account/${id}`
      );
  }
  getAccountLikesRequest(id?: string): Observable<LikeModel[]>{
    return this.http
      .get<LikeModel[]>(
        `${this.config.apiUrl}/account/${id}/likes`
      );
  }
  postLoginRequest(data: LoginModel): Observable<UserInfoModel> {
    return this.http
      .post<UserInfoModel>(
        `${this.config.apiUrl}/account/login`,
        data,
        {responseType: "json",});
  }
  postRegisterRequest(data: RegisterModel): Observable<any> {
    return this.http
      .post(
        `${this.config.apiUrl}/account/register`,
        data,
        {responseType: "json",});
  }
  postPictureRequest(data: FormData): Observable<any> {
    return this.http
      .post(
        `${this.config.apiUrl}/picture/create`,
        data
      );
  }
  deletePictureRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${this.config.apiUrl}/picture/${id}`
      );
  }
  patchPictureLikeRequest(id: string): Observable<Picture> {
    return this.http
      .patch<Picture>(
        `${this.config.apiUrl}/picture/${id}/voteup`,
        {}
      );
  }
  patchPictureDislikeRequest(id: string): Observable<Picture> {
    return this.http
      .patch<Picture>(
        `${this.config.apiUrl}/picture/${id}/votedown`,
        {}
      );
  }
  putPictureRequest(data: PutPictureModel, id: string) {
    return this.http
      .put<Picture>(
        `${this.config.apiUrl}/picture/${id}`,
        data
      )
  }


}
