import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import { PictureModel } from 'src/app/Models/ApiModels/Get/PictureModel';
import { PicturePagedResult } from 'src/app/Models/ApiModels/Get/PicturePagedResult';
import { LoginModel } from 'src/app/Models/ApiModels/Post/LoginModel';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { RegisterModel } from 'src/app/Models/ApiModels/Post/RegisterModel';
import { ConfigServiceService } from '../data/config-service.service';
import {PutPictureModel} from "../../Models/ApiModels/Post/PutPictureModel";
import {LikeModel} from "../../Models/ApiModels/Get/LikeModel";
import {AccountPagedResult} from "../../Models/ApiModels/Get/AccountPagedResult";
import {AccountModel} from "../../Models/ApiModels/Get/AccountModel";
import {CommentModel} from "../../Models/ApiModels/Get/CommentModel";
import {PutPostCommentModel} from "../../Models/ApiModels/Post/PutPostCommentModel";
import {PopularModel} from "../../Models/ApiModels/Get/PopularModel";
import {LsJwtDetails} from "../../Models/ApiModels/Post/LsJwtDetails";
import {PutAccountModel} from "../../Models/ApiModels/Post/PutAccountModel";
import {PostSendLogsModel} from "../../Models/ApiModels/Post/PostSendLogsModel";
import {PictureClassifiedModel} from "../../Models/ApiModels/Post/PictureClassifiedModel";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient,
    private config: ConfigServiceService,
    private params: HttpParamsServiceService
  ) {}

  getPicturesRequest(params: HttpParams): Observable<PicturePagedResult>{
    return this.http
      .get<PicturePagedResult>(
      `${this.config.picturesApiUrl}/api/picture`,
      {params: params}
    );
  }
  getPersonalizedPicturesRequest(): Observable<PictureModel[]>{
    return this.http
      .get<PictureModel[]>(
        `${this.config.picturesApiUrl}/api/picture/personalized`,
        {params: this.params.getGetPersonalizedPicParams()}
      );
  }
  searchPicturesRequest(): Observable<PicturePagedResult>{
    return this.http
      .get<PicturePagedResult>(
        `${this.config.picturesApiUrl}/api/picture/search`,
        {params: this.params.getSearchPicParams()}
      );
  }

  getPictureRequest(id?: string): Observable<PictureModel>{
    return this.http
      .get<PictureModel>(
      `${this.config.picturesApiUrl}/api/picture/${id}`
    );
  }
  getPictureLikesRequest(id?: string): Observable<LikeModel[]>{
    return this.http
      .get<LikeModel[]>(
        `${this.config.picturesApiUrl}/api/picture/${id}/likes`
      );
  }
  searchAccountsRequest(): Observable<AccountPagedResult>{
    return this.http
      .get<AccountPagedResult>(
        `${this.config.picturesApiUrl}/api/account`,
        {params: this.params.getSearchAccParams()}
      );
  }
  getAccountRequest(id: string): Observable<AccountModel>{
    return this.http
      .get<AccountModel>(
        `${this.config.picturesApiUrl}/api/account/${id}`
      );
  }
  getAccountLikesRequest(id?: string): Observable<LikeModel[]>{
    return this.http
      .get<LikeModel[]>(
        `${this.config.picturesApiUrl}/api/account/${id}/likes`
      );
  }
  getPopularRequest(): Observable<PopularModel> {
    return this.http
      .get<PopularModel>(
        `${this.config.picturesApiUrl}/api/popular`
      );
  }
  postLoginRequest(data: LoginModel): Observable<UserInfoModel> {
    return this.http
      .post<UserInfoModel>(
        `${this.config.picturesApiUrl}/api/account/login`,
        data,
        {responseType: "json",});
  }
  postLsLoginRequest(data: LsJwtDetails): Observable<UserInfoModel> {
    return this.http
      .post<UserInfoModel>(
        `${this.config.picturesApiUrl}/api/account/verifyJwt`,
        data,
        {responseType: "json",});
  }
  postRegisterRequest(data: RegisterModel): Observable<any> {
    return this.http
      .post(
        `${this.config.picturesApiUrl}/api/account/register`,
        data,
        {responseType: "json",});
  }
  postPictureRequest(data: FormData): Observable<any> {
    return this.http
      .post(
        `${this.config.picturesApiUrl}/api/picture/create`,
        data
      );
  }
  postClassifyPictureRequest(data: FormData): Observable<PictureClassifiedModel> {
    return this.http
      .post<PictureClassifiedModel>(
        `${this.config.picturesApiUrl}/api/picture/classify`,
        data
      );
  }
  postCommentRequest(picId: string, data: PutPostCommentModel): Observable<CommentModel> {
    return this.http
      .post<CommentModel>(
        `${this.config.picturesApiUrl}/api/picture/${picId}/comment`,
        data
      );
  }

  postSendLogsRequest(data: PostSendLogsModel) {
    return this.http
      .post<boolean>(
        `${this.config.emailApiUrl}/api/contact/sendErrorEmail`,
        data
      )
  }
  postCheckEmailSendingAvailability() {
    return this.http
      .post<boolean>(
        `${this.config.emailApiUrl}/api/contact/check`,
        {}
      )
  }


  deleteCommentRequest(picId: string, commId: string): Observable<CommentModel> {
    return this.http
      .delete<CommentModel>(
        `${this.config.picturesApiUrl}/api/picture/${picId}/comment/${commId}`,
        {}
      );
  }
  deletePictureRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${this.config.picturesApiUrl}/api/picture/${id}`
      );
  }
  deleteAccountRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${this.config.picturesApiUrl}/api/account/${id}`
      );
  }

  patchPictureLikeRequest(id: string): Observable<PictureModel> {
    return this.http
      .patch<PictureModel>(
        `${this.config.picturesApiUrl}/api/picture/${id}/voteup`,
        {}
      );
  }
  patchPictureDislikeRequest(id: string): Observable<PictureModel> {
    return this.http
      .patch<PictureModel>(
        `${this.config.picturesApiUrl}/api/picture/${id}/votedown`,
        {}
      );
  }

  putPictureRequest(data: PutPictureModel, id: string) {
    return this.http
      .put<PictureModel>(
        `${this.config.picturesApiUrl}/api/picture/${id}`,
        data
      );
  }
  putAccountRequest(data: PutAccountModel) {
    return this.http
      .put<boolean>(
        `${this.config.picturesApiUrl}/api/account/update`,
        data
      );
  }


}
