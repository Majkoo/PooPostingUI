import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import { PictureModel } from 'src/app/Models/ApiModels/PictureModel';
import { PicturePagedResult } from 'src/app/Models/ApiModels/PicturePagedResult';
import { LoginModel } from 'src/app/Models/ApiModels/LoginModel';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { RegisterModel } from 'src/app/Models/ApiModels/RegisterModel';
import { ConfigServiceService } from '../data/config-service.service';
import {PutPictureModel} from "../../Models/ApiModels/PutPictureModel";
import {LikeModel} from "../../Models/ApiModels/LikeModel";
import {AccountPagedResult} from "../../Models/ApiModels/AccountPagedResult";
import {AccountModel} from "../../Models/ApiModels/AccountModel";
import {CommentModel} from "../../Models/ApiModels/CommentModel";
import {PutPostCommentModel} from "../../Models/ApiModels/PutPostCommentModel";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient,
    private config: ConfigServiceService,
    private params: HttpParamsServiceService
  ) { }

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
  getPictureRequest(id?: string): Observable<PictureModel>{
    return this.http
      .get<PictureModel>(
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
  postCommentRequest(picId: string, data: PutPostCommentModel): Observable<CommentModel> {
    return this.http
      .post<CommentModel>(
        `${this.config.apiUrl}/picture/${picId}/comment`,
        data
      );
  }
  deleteCommentRequest(picId: string, commId: string): Observable<CommentModel> {
    return this.http
      .delete<CommentModel>(
        `${this.config.apiUrl}/picture/${picId}/comment/${commId}`,
        {}
      );
  }
  deletePictureRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${this.config.apiUrl}/picture/${id}`
      );
  }
  patchPictureLikeRequest(id: string): Observable<PictureModel> {
    return this.http
      .patch<PictureModel>(
        `${this.config.apiUrl}/picture/${id}/voteup`,
        {}
      );
  }
  patchPictureDislikeRequest(id: string): Observable<PictureModel> {
    return this.http
      .patch<PictureModel>(
        `${this.config.apiUrl}/picture/${id}/votedown`,
        {}
      );
  }
  putPictureRequest(data: PutPictureModel, id: string) {
    return this.http
      .put<PictureModel>(
        `${this.config.apiUrl}/picture/${id}`,
        data
      )
  }


}
