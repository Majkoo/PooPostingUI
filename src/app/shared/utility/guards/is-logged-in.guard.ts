import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../../services/data-access/account/auth.service";

export const isLoggedInGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn ? true : inject(Router).createUrlTree(['/login']);
};
