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
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.message.clear();
            if (error.status >= 400 && error.status < 500) {
              if(error.status === 404) {
                return throwError(() => {
                  this.message.add({severity:'warn', summary: 'Niepowodzenie', detail: 'Nie udało się wykonać operacji. Zasób jest niedostępny. Prawdopodobnie został usunięty lub ukryty.'});
                });
              }
              return throwError(() => {return error});
            }
            else if (error.status === 401 || error.status === 403) {
              return throwError(() => {
                this.message.add({severity:'error', summary: 'Niepowodzenie', detail: 'Nie udało się wykonać operacji. Nie masz uprawnień.'});
              });
            }
            else if (error.status === 0) {
              return throwError(() => {
                this.router.navigate(['/error0']);
                console.error(error);
              })
            }
            else {
              return throwError(() => {
                this.router.navigate(['/error500']);
                console.error(error);
              })
            }

        }),
      );
  }
}
