import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {APP_LAYOUT_ROUTES} from "./routes/app-layout.routes";
import {AUTH_LAYOUT_ROUTES} from "./routes/auth-layout.routes";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {ErrorLayoutComponent} from "./layout/error-layout/error-layout.component";
import {ERROR_LAYOUT_ROUTES} from "./routes/error-layout.routes";


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: APP_LAYOUT_ROUTES
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: AUTH_LAYOUT_ROUTES
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    children: ERROR_LAYOUT_ROUTES
  },
  {
    path: '**',
    redirectTo: '/404',
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
