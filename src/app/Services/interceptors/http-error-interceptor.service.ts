import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';
import {catchError, delay, mergeMap, retryWhen} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

export const retryCount: number = 2;
export const delayMs: number = 2000;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private message: MessageService,
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.message.clear();
    return next.handle(req)
      .pipe(
        retryWhen((error) => {
          return error.pipe(
            mergeMap((error, index) => {
              if (index < retryCount) return of(error).pipe(delay(delayMs));
              throw error;
            })
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error.status, req, error);
        })
      );
  }

  private handleError(status: number, req?: HttpRequest<any>, error?: HttpErrorResponse) {
    console.error(
      `=============================================================\n` +
      `Error status: ${status}\n` +
      `Error json: ${JSON.stringify(error)}\n` +
      `Request json: ${JSON.stringify(req)}\n` +
      `=============================================================\n`
    );
    switch (status) {
      case (400): {
        return throwError(() => {
          this.message.add({
            severity:'error',
            summary:'Błąd',
            detail:'Wystąpił nieoczekiwany błąd. Przepraszamy za utrudnienia.'
          })
          console.log(error)
        });
      }
      case (401): {
        return throwError(() => {
          this.message.add({
            severity:'error',
            summary: 'Niepowodzenie',
            detail: 'Nie udało się wykonać operacji. Do jej wykonania konieczne jest zalogowanie się.'});
        });
      }
      case (403): {
        return throwError(() => {
          this.message.add({
            severity:'error',
            summary: 'Niepowodzenie',
            detail: 'Nie udało się wykonać operacji. Nie masz uprawnień.'});
        });
      }
      case (404): {
        return throwError(() => {
          this.message.add({
            severity:'warn',
            summary: 'Niepowodzenie',
            detail: 'Nie udało się wykonać operacji. Zasób jest niedostępny. Prawdopodobnie został usunięty lub ukryty.'
          });
        })
      }
      case (0): {
        return throwError(() => {
          this.router.navigate(['/error0']);
        })
      }
      default: {
        let statusStr = status.toString()

        if (statusStr.startsWith("4")) {
          return throwError(() => {
            this.message.add({
              severity:'error',
              summary:'Błąd',
              detail:'Wystąpił nieoczekiwany błąd. Przepraszamy za utrudnienia.'
            });
          })
        }
        else if (statusStr.startsWith("5")) {
          return throwError(() => {
            this.router.navigate(['/error500']);
          });
        }
        return throwError(() => {});
      }
    }
  }

}
