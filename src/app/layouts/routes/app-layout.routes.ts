import {Routes} from "@angular/router";

export const APP_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../views/home/home.component')
      .then(m => m.HomeComponent)
  },
  // {
  //   path: "search",
  //   loadChildren: () => import('../view/search/feature/search-shell/search-shell.module')
  //     .then(m => m.SearchShellModule)
  // },
  // {
  //   path: "popular",
  //   loadChildren: () => import('../view/popular/feature/popular-shell/popular-shell.module')
  //     .then(m => m.PopularShellModule)
  // },
  // {
  //   path: "tos",
  //   loadChildren: () => import('../view/terms-of-service/feature/tos-shell/tos-shell.module')
  //     .then(m => m.TosShellModule)
  // },
  // {
  //   path: "picture",
  //   loadChildren: () => import('../view/picture/feature/picture-shell/picture-shell.module')
  //     .then(m => m.PictureShellModule)
  // },
  // {
  //   path: "account",
  //   loadChildren: () => import('../view/account/feature/account-shell/account-shell.module')
  //     .then(m => m.AccountShellModule)
  // },
]
