import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import {catchError, retry} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {

          switch (error.status) {
            case (0): {
              return throwError(() => {
                this.router.navigate(['/error0']);
                console.error(error);
              })
            }
            case (400 || 401 || 402 || 403 || 404 || 405): {
              if (error.error === "pictures not found" ||
                  error.error === "accounts not found" ||
                  error.error.title === "One or more validation errors occurred." ||
                  error.error === "Invalid nickname or password") {
                return throwError(() => {
                  console.error(error);
                });
              }
              else {
                return throwError(() => {
                  console.error(error);
                })
              }
            }
            default: {
              return throwError(() => {
                this.router.navigate(['/error500']);
                console.error(error);
              })
            }
          }

        })
      );
  }
}
