import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionStorageServiceService} from "../data/session-storage-service.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedOnRouteGuardGuard implements CanActivate {
  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.sessionStorageService.isLoggedOn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.messageService.add({
        life: 7500,
        severity: 'warn',
        detail: 'Aby udać się na tą podstronę, należy się zalogować.',
      })
      return false;
    }
  }
}
