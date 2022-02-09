import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import {catchError} from "rxjs/operators";
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
        catchError((error: HttpErrorResponse) => {
          if (error.status.toString().startsWith("5") || error.status.toString().startsWith("0")) {
            return throwError(() => {
              this.router.navigate(['/error500']);
              console.error(`An error occured.\nStatus: ${error.status}\nBody:`)
              console.log(error);
            })

          }
          else if (error.error === "Invalid nickname or password") {
            return throwError( () => {
              console.error("Login failed. (wrong login credentials)")
            });
          }
          else if(error.error.title === "One or more validation errors occurred."){
            return throwError( () => {
              console.error("Register failed. (validation error)")
              console.log(error);
            });
          }
          else {
            return throwError(() => {
              console.error(`An error occured.\nStatus: ${error.status}\nBody:`)
              console.log(error);
            });
          }


        })
      );
  }
}
