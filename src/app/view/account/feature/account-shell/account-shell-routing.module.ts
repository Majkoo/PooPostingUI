import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsNotLoggedOnRouteGuardGuard} from "../../../../shared/utility/guards/is-not-logged-on-route-guard.guard";

const routes: Routes = [
  {
    path: "my-account",
    canActivate: [IsNotLoggedOnRouteGuardGuard],
    loadChildren: () =>
      import("../my-account/my-account.module")
        .then(m => m.MyAccountModule),
  },
  {
    path: ":id",
    loadChildren: () =>
      import("../account-details/account-details.module")
        .then(m => m.AccountDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountShellRoutingModule { }
