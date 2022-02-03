import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {AuthServiceService} from "../singletons/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.getAuthToken()) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getAuthToken()}`
        }
      });
      return next.handle(tokenizedReq);
    }

    return next.handle(req);

  }
}
