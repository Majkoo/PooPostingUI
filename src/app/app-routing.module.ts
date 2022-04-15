import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/Auth/components/login/login.component';
import { RegisterComponent } from './Modules/Auth/components/register/register.component';
import { LoggedOutComponent } from './Modules/Auth/components/logged-out/logged-out.component';
import { PostPictureComponent } from "./Modules/Core/common-pages/post-picture/post-picture.component";
import { Error404Component } from "./Modules/Core/common-pages/errors/error404/error404.component";
import { Error500Component } from "./Modules/Core/common-pages/errors/error500/error500.component";
import { Error0Component } from "./Modules/Core/common-pages/errors/error0/error0.component";
import { SearchComponent } from "./Modules/Core/common-pages/search/search.component";
import { HomepageComponent } from "./Modules/Core/common-pages/homepage/homepage.component";
import { MyAccountComponent } from "./Modules/Core/common-pages/my-account/my-account.component";
import { PopularComponent } from "./Modules/Core/common-pages/popular/popular.component";
import { PictureDetailsComponent } from "./Modules/Core/common-pages/picture-details/picture-details.component";
import { AccountDetailsComponent } from "./Modules/Core/common-pages/account-details/account-details.component";
import {IsNotLoggedOnRouteGuardGuard} from "./Services/guards/is-not-logged-on-route-guard.guard";
import {IsLoggedOnRouteGuardGuard} from "./Services/guards/is-logged-on-route-guard.guard";
import {LogsComponent} from "./Modules/Debug/logs/logs.component";
import {TosComponent} from "./Modules/Tos/tos/tos.component";
import {RulebookComponent} from "./Modules/Tos/rulebook/rulebook.component";


const routes: Routes = [
  {path: '', redirectTo: "/home/1", pathMatch: 'full'},
  {path: 'home/page/:pageNumberOld', redirectTo: "/home/1", pathMatch: 'full'},

  {path: 'home', redirectTo: "/home/1", pathMatch: 'full'},
  {path: "home/:pageNumber", component: HomepageComponent},
  {path: "search/:pageNumber", component: SearchComponent},

  {path: "report", component: LogsComponent},

  {path: "logged-out", component: LoggedOutComponent},
  {path: "popular", component: PopularComponent},
  {path: "tos", component: TosComponent},
  {path: "rulebook", component: RulebookComponent},


  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsLoggedOnRouteGuardGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsLoggedOnRouteGuardGuard]
  },

  {
    path: "picture",
    children: [
      {
        path: "post",
        component: PostPictureComponent,
        canActivate: [IsNotLoggedOnRouteGuardGuard],
      },
      {
        path: ":id",
        component: PictureDetailsComponent,
      },
    ]
  },
  {
    path: "account",
    children: [
      {
        path: ":id",
        component: AccountDetailsComponent,
      },
    ]
  },

  {
    path: "my-account",
    component: MyAccountComponent,
    canActivate: [IsNotLoggedOnRouteGuardGuard],
  },

  { path: "error500", component: Error500Component },
  { path: "error404", component: Error404Component },
  { path: "error0", component: Error0Component },

  { path: '**', redirectTo: '/error404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
