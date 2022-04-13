import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionStorageServiceService} from "../data/session-storage-service.service";
import {MessageService} from "primeng/api";
import {UserDataServiceService} from "../data/user-data-service.service";

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedOnRouteGuardGuard implements CanActivate {
  constructor(
    private userDataService: UserDataServiceService,
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.userDataService.isUserLoggedOn()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(val => {
        if (val) {
          this.messageService.add({
            life: 7500,
            severity: 'warn',
            summary: 'Przekierowano cię na stronę logowania.',
            detail: 'Aby udać się na tą podstronę, należy się zalogować.'
          })
        }
      });
      return false;
    }
  }
}
