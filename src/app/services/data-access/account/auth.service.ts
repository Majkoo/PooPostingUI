import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginDto} from "../../../shared/utility/dtos/LoginDto";
import {JwtUserData} from "../../../shared/utility/models/jwtUserData";
import {environment} from "../../../../environments/environment";
import {CreateAccountDto} from "../../../shared/utility/dtos/CreateAccountDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(dto: LoginDto): Observable<JwtUserData> {
    return this.httpClient
      .post<JwtUserData>(
        `${environment.apiUrl}/auth/login`,
        dto,
        {responseType: "json",});
  }

  register(dto: CreateAccountDto): Observable<void> {
    return this.httpClient
      .post<void>(
        `${environment.apiUrl}/auth/register`,
        dto,
        {responseType: "json",});
  }

  saveJwtData(jwtData: JwtUserData) {
    localStorage.setItem("jwtUserData", JSON.stringify(jwtData));
  }

  logout() {
    localStorage.removeItem("jwtUserData");
    window.location.reload();
  }

  getJwtData(): JwtUserData | null {
    const dataString: string | null = localStorage.getItem("jwtUserData")
    return dataString ? JSON.parse(dataString) : null;
  }

  get isLoggedIn(): boolean {
    return this.getJwtData() != null;
  }

  // verifyJwt(data: VerifyJwtDto): Observable<JwtUserData> {
  //   return this.httpClient
  //     .post<JwtUserData>(
  //       `${environment.picturesApiUrl}/account/auth/verifyJwt`,
  //       data,
  //       {responseType: "json",});
  // }

}
