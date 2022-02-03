import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './Modules/auth/components/login/login.component';
import { RegisterComponent } from './Modules/auth/components/register/register.component';
import { Error404Component } from './Modules/core/common-pages/errors/error404/error404.component';
import { Error500Component } from './Modules/core/common-pages/errors/error500/error500.component';
import { HomepageComponent } from './Modules/core/common-pages/homepage/homepage.component';
import { PictureDetailsComponent } from './Modules/core/common-pages/picture-details/picture-details.component';
import { PostPictureComponent } from './Modules/core/common-pages/post-picture/post-picture.component';
import { SearchComponent } from './Modules/core/common-pages/search/search.component';

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},
  {path: "home", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "search", component: SearchComponent},
  {path: "picture/post", component: PostPictureComponent},
  {path: "picture/:id", component: PictureDetailsComponent},
  {path: "error500", component: Error500Component},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
