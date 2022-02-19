import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './Modules/auth/components/login/login.component';
import { RegisterComponent } from './Modules/auth/components/register/register.component';
import { Error404Component } from './Modules/core/common-pages/errors/error404/error404.component';
import { Error500Component } from './Modules/core/common-pages/errors/error500/error500.component';
import { HomepageComponent } from './Modules/core/common-pages/homepage/homepage.component';
import { PostPictureComponent } from './Modules/core/common-pages/post-picture/post-picture.component';
import { SearchComponent } from './Modules/core/common-pages/search/search.component';
import {MyAccountComponent} from "./Modules/core/common-pages/my-account/my-account.component";
import { RouteGuardGuard } from './Services/guards/route-guard.guard';
import {MyPicturesComponent} from "./Modules/core/common-pages/my-pictures/my-pictures.component";
import {LoggedOutComponent} from "./Modules/core/common-pages/logged-out/logged-out.component";

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},

  {
    path: "picture/post",
    component: PostPictureComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: "my-account",
    component: MyAccountComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: "my-account/picture",
    component: MyPicturesComponent,
    canActivate: [RouteGuardGuard]
  },

  {path: "home", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "logged-out", component: LoggedOutComponent},
  {path: "search", component: SearchComponent},

  {path: "error500", component: Error500Component},
  {path: "error404", component: Error404Component},

  {path: '**', redirectTo: '/error404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
