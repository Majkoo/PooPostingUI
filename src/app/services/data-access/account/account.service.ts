// import { Injectable } from '@angular/core';
// import {HttpClient, HttpParams} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {environment} from "../../../environments/environment";
// import {HttpParamsServiceService} from "../http-params-service.service";
// import {AccountDto} from "../../shared/utility/dtos/AccountDto";
// import {AccountDtoPaged} from "../../shared/utility/dtos/AccountDtoPaged";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {
//
//   constructor(
//     private httpClient: HttpClient,
//     private paramsService: HttpParamsServiceService
//   ) { }
//
//   getAccountById(id: string): Observable<AccountDto>{
//     return this.httpClient
//       .get<AccountDto>(
//         `${environment.picturesApiUrl}/account/${id}`,
//         {responseType: "json",}
//       );
//   }
//
//   searchAccounts(params: HttpParams): Observable<AccountDtoPaged>{
//     return this.httpClient
//       .get<AccountDtoPaged>(
//         `${environment.picturesApiUrl}/account`,
//         {
//           params: params,
//           responseType: "json"
//         },
//       );
//   }
//
//   deleteAccount(id: string): Observable<null> {
//     return this.httpClient
//       .delete<null>(
//         `${environment.picturesApiUrl}/account/${id}`,
//         {responseType: "json",}
//       );
//   }
//
//
// }
