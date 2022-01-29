import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserInfoModel} from "../../Models/UserInfoModel";
import {ConfigServiceService} from "./singletons/config-service.service";
import {LoginModel} from "../../Models/LoginModel";
import {Observable} from "rxjs";
import {RegisterModel} from "../../Models/RegisterModel";
import {AuthServiceService} from "./singletons/auth-service.service";
import {PostPictureModel} from "../../Models/PostPictureModel";
import {HttpHeadersServiceService} from "./http-headers-service.service";

@Injectable({
  providedIn: 'root'
})
export class HttpPostServiceService {

  constructor(
    private http: HttpClient,
    private config: ConfigServiceService,
    private headers: HttpHeadersServiceService) { }


  login(login: LoginModel): Observable<UserInfoModel>{
    return this.http.post<UserInfoModel>(this.config.apiUrl + "account/login", login, {
      responseType: "json",
      withCredentials: true
    })
  }

  register(register: RegisterModel){
    return this.http.post<RegisterModel>( this.config.apiUrl + 'account/register', register)
  }

  postPicture(fData: FormData){
    return this.http.post<PostPictureModel>(this.config.apiUrl + 'picture/create', fData, {
      headers: this.headers.getAuthHeader()})
  }

}
