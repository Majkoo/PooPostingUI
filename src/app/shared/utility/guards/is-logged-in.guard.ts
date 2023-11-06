import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../../services/data-access/account/auth.service";
import {ToastrService} from "ngx-toastr";

export const isLoggedInGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn
  if (isLoggedIn) return true;

  inject(ToastrService).error('You need to login to go there', 'Unauthorized');
  return inject(Router).createUrlTree(['/login']);

};
