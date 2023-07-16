import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserState} from "../../shared/utility/models/userState";
import {LoginDto} from "../../shared/utility/dtos/LoginDto";
import {RegisterDto} from "../../shared/utility/dtos/RegisterDto";
import {VerifyJwtDto} from "../../shared/utility/dtos/VerifyJwtDto";

@Injectable({
  providedIn: 'root'
})
export class AccountAuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(dto: LoginDto): Observable<UserState> {
    return this.httpClient
      .post<UserState>(
        `${environment.picturesApiUrl}/account/auth/login`,
        dto,
        {responseType: "json",});
  }

  register(data: RegisterDto): Observable<any> {
    return this.httpClient
      .post(
        `${environment.picturesApiUrl}/account/auth/register`,
        data,
        {responseType: "json",});
  }

  verifyJwt(data: VerifyJwtDto): Observable<UserState> {
    return this.httpClient
      .post<UserState>(
        `${environment.picturesApiUrl}/account/auth/verifyJwt`,
        data,
        {responseType: "json",});
  }

}
