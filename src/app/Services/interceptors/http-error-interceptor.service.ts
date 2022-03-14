import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import {catchError, retry} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private message: MessageService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let retryCount: number = 1;
    let i: number = 0;

    return next.handle(req)
      .pipe(
        retry(retryCount),
        catchError((error: HttpErrorResponse) => {
          this.message.clear();
          i++;

          switch (error.status) {
            case 0: {
              return this.handle0Error(i, retryCount);
            }
            case 404: {
              return (req.method === "GET") ? throwError(() => {}) : this.handle404Error(i, retryCount);
            }
            case 403: {
              return this.handle403Error(i, retryCount);
            }
            case 401: {
              return this.handle401Error(i, retryCount);
            }
            default: {
              return throwError(() => console.error(error));
            }
          }
          
        })
      );
  }

  private handle404Error(i: number, retryCount: number) {
    let errorFactory = () => {
      this.message.add({
        severity:'warn',
        summary: 'Niepowodzenie',
        detail: 'Nie udało się wykonać operacji. Zasób jest niedostępny. Prawdopodobnie został usunięty lub ukryty.'
      });
    }
    return (i === retryCount) ? throwError(errorFactory) : throwError(() => {});
  }
  private handle401Error(i: number, retryCount: number) {
    let errorFactory = () => {
      this.message.add({
        severity:'error',
        summary: 'Niepowodzenie',
        detail: 'Nie udało się wykonać operacji. Do jej wykonania konieczne jest zalogowanie się.'});
    }
    return (i === retryCount) ? throwError(errorFactory) : throwError(() => {});
  }
  private handle403Error(i: number, retryCount: number) {
    let errorFactory = () => {
      this.message.add({
        severity:'error',
        summary: 'Niepowodzenie',
        detail: 'Nie udało się wykonać operacji. Nie masz uprawnień.'});
    }
    return (i === retryCount) ? throwError(errorFactory) : throwError(() => {});
  }
  private handle0Error(i: number, retryCount: number) {
    let errorFactory = () => {this.router.navigate(['/error500']);}
    return (i === retryCount) ? throwError(errorFactory) : throwError(() => {});
  }
}
