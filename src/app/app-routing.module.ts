import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./components/pages/homepage/homepage.component";
import {NotfoundComponent} from "./components/pages/notfound/notfound.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {PostComponent} from "./components/pages/post/post.component";
import {PictureDetailsComponent} from "./components/pages/picture-details/picture-details.component";

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},
  {path: "home", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "post", component: PostComponent},
  {path: "picture/:id", component: PictureDetailsComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
