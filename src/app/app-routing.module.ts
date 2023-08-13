import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import {APP_LAYOUT_ROUTES} from "./layouts/routes/app-layout.routes";

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: APP_LAYOUT_ROUTES
  },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: AUTH_LAYOUT_ROUTES
  // },
  // {
  //   path: '',
  //   component: ErrorLayoutComponent,
  //   children: ERROR_LAYOUT_ROUTES
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule
    .forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabledNonBlocking'
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
