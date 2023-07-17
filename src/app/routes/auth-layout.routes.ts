import {Routes} from "@angular/router";

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: "auth",
    loadChildren: () => import('../view/auth/feature/auth-shell/auth-shell.module')
      .then(m => m.AuthShellModule)
  },
]
