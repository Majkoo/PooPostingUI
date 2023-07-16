import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParamsServiceService} from "./http-params-service.service";
import {PictureDtoPaged} from "../shared/utility/dtos/PictureDtoPaged";
import {environment} from "../../environments/environment";
import {PictureDto} from "../shared/utility/dtos/PictureDto";
import {LikeDto} from "../shared/utility/dtos/LikeDto";
import {AccountDtoPaged} from "../shared/utility/dtos/AccountDtoPaged";
import {AccountDto} from "../shared/utility/dtos/AccountDto";
import {PopularDto} from "../shared/utility/dtos/PopularDto";
import {VerifyJwtDto} from "../shared/utility/dtos/VerifyJwtDto";
import {UserState} from "../shared/utility/models/userState";
import {PictureClassificationDto} from "../shared/utility/dtos/PictureClassificationDto";
import {PutPostCommentDto} from "../shared/utility/dtos/PutPostCommentDto";
import {CommentDto} from "../shared/utility/dtos/CommentDto";
import {PostLogsDto} from "../shared/utility/dtos/PostLogsDto";
import {UpdatePictureNameDto} from "../shared/utility/dtos/UpdatePictureNameDto";
import {UpdatePictureDescriptionDto} from "../shared/utility/dtos/UpdatePictureDescriptionDto";
import {UpdatePictureTagsDto} from "../shared/utility/dtos/UpdatePictureTagsDto";
import {UpdateAccountEmailDto} from "../shared/utility/dtos/UpdateAccountEmailDto";
import {UpdateAccountPasswordDto} from "../shared/utility/dtos/UpdateAccountPasswordDto";
import {UpdateAccountDescriptionDto} from "../shared/utility/dtos/UpdateAccountDescriptionDto";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient,
    private params: HttpParamsServiceService
  ) {}

  getPicturesRequest(params: HttpParams): Observable<PictureDtoPaged>{
    return this.http
      .get<PictureDtoPaged>(
      `${environment.picturesApiUrl}/picture`,
      {params: params}
    );
  }
  getPersonalizedPicturesRequest(): Observable<PictureDto[]>{
    return this.http
      .get<PictureDto[]>(
        `${environment.picturesApiUrl}/picture/personalized`,
        {params: this.params.getGetPersonalizedPicParams()}
      );
  }
  searchPicturesRequest(): Observable<PictureDtoPaged>{
    return this.http
      .get<PictureDtoPaged>(
        `${environment.picturesApiUrl}/picture/search`,
        {params: this.params.getSearchPicParams()}
      );
  }

  getPictureRequest(id?: string): Observable<PictureDto>{
    return this.http
      .get<PictureDto>(
      `${environment.picturesApiUrl}/picture/${id}`
    );
  }
  getPictureLikesRequest(id?: string): Observable<LikeDto[]>{
    return this.http
      .get<LikeDto[]>(
        `${environment.picturesApiUrl}/picture/${id}/like`
      );
  }
  searchAccountsRequest(): Observable<AccountDtoPaged>{
    return this.http
      .get<AccountDtoPaged>(
        `${environment.picturesApiUrl}/account`,
        {params: this.params.getSearchAccParams()}
      );
  }
  getAccountRequest(id: string): Observable<AccountDto>{
    return this.http
      .get<AccountDto>(
        `${environment.picturesApiUrl}/account/${id}`
      );
  }
  getAccountLikesRequest(id?: string): Observable<LikeDto[]>{
    return this.http
      .get<LikeDto[]>(
        `${environment.picturesApiUrl}/account/${id}/likes`
      );
  }
  getPopularRequest(): Observable<PopularDto> {
    return this.http
      .get<PopularDto>(
        `${environment.picturesApiUrl}/popular`
      );
  }
  postLsLoginRequest(data: VerifyJwtDto): Observable<UserState> {
    return this.http
      .post<UserState>(
        `${environment.picturesApiUrl}/account/auth/verifyJwt`,
        data,
        {responseType: "json",});
  }
  postPictureRequest(data: FormData): Observable<any> {
    return this.http
      .post(
        `${environment.picturesApiUrl}/picture/post`,
        data
      );
  }
  postClassifyPictureRequest(data: FormData): Observable<PictureClassificationDto> {
    return this.http
      .post<PictureClassificationDto>(
        `${environment.picturesApiUrl}/picture/classify`,
        data
      );
  }
  postCommentRequest(picId: string, data: PutPostCommentDto): Observable<CommentDto> {
    return this.http
      .post<CommentDto>(
        `${environment.picturesApiUrl}/picture/${picId}/comment`,
        data
      );
  }

  deleteCommentRequest(picId: string, commId: string): Observable<CommentDto> {
    return this.http
      .delete<CommentDto>(
        `${environment.picturesApiUrl}/picture/${picId}/comment/${commId}`,
        {}
      );
  }

  postSendLogsRequest(data: PostLogsDto) {
    return this.http
      .post<boolean>(
        `${environment.emailApiUrl}/contact/sendErrorEmail`,
        data
      )
  }
  postCheckEmailSendingAvailability() {
    return this.http
      .post<boolean>(
        `${environment.emailApiUrl}/contact/check`,
        {}
      )
  }

  deletePictureRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${environment.picturesApiUrl}/picture/${id}`
      );
  }
  deleteAccountRequest(id: string): Observable<any> {
    return this.http
      .delete(
        `${environment.picturesApiUrl}/account/${id}`
      );
  }

  patchPictureLikeRequest(id: string): Observable<PictureDto> {
    return this.http
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/vote-up`,
        {}
      );
  }
  patchPictureDislikeRequest(id: string): Observable<PictureDto> {
    return this.http
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/vote-down`,
        {}
      );
  }

  updatePictureRequest(data: FormData, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}`,
        data
      );
  }

  updatePictureNameRequest(data: UpdatePictureNameDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/name`,
        data
      );
  }

  updatePictureDescriptionRequest(data: UpdatePictureDescriptionDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/description`,
        data
      );
  }

  updatePictureTagsRequest(data: UpdatePictureTagsDto, id: string) {
    return this.http
      .post<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/tags`,
        data
      );
  }

  updateAccountRequest(data: FormData) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update`,
        data
      );
  }

  updateAccountEmailRequest(data: UpdateAccountEmailDto) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/email`,
        data
      );
  }

  updateAccountPasswordRequest(data: UpdateAccountPasswordDto) {
    return this.http
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/password`,
        data
      );
  }

  updateAccountDescriptionRequest(data: UpdateAccountDescriptionDto) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/description`,
        data
      );
  }

  updateAccountProfilePictureRequest(file: string) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/profile-picture`,
        file
      );
  }

  updateAccountBackgroundPictureRequest(file: string) {
    return this.http
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/background-picture`,
        file
      );
  }

}
