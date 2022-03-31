import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {LocalStorageServiceService} from "../data/local-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.localStorageService.getJwtDetails()?.jwtToken) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorageService.getJwtDetails()?.jwtToken}`
        }
      });
      return next.handle(tokenizedReq);
    }

    return next.handle(req);

  }
}
