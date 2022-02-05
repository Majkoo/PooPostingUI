import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthServiceService } from '../data/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {

  constructor(
    private auth: AuthServiceService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isUserLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }


}
