import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './Modules/Auth/components/login/login.component';
import { RegisterComponent } from './Modules/Auth/components/register/register.component';
import { LoggedOutComponent } from './Modules/Core/common-pages/logged-out/logged-out.component';
import {PostPictureComponent} from "./Modules/Core/common-pages/post-picture/post-picture.component";
import {MyPicturesComponent} from "./Modules/Core/common-pages/my-pictures/my-pictures.component";
import {Error404Component} from "./Modules/Core/common-pages/errors/error404/error404.component";
import {Error500Component} from "./Modules/Core/common-pages/errors/error500/error500.component";
import {RouteGuardGuard} from "./Services/guards/route-guard.guard";
import {SearchComponent} from "./Modules/Core/common-pages/search/search.component";
import {HomepageComponent} from "./Modules/Core/common-pages/homepage/homepage.component";
import {MyAccountComponent} from "./Modules/Core/common-pages/my-account/my-account.component";
import {PopularComponent} from "./Modules/Core/common-pages/popular/popular.component";


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
  {path: "popular", component: PopularComponent},

  {path: "error500", component: Error500Component},
  {path: "error404", component: Error404Component},

  {path: '**', redirectTo: '/error404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
