import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {RegisterComponent} from "./auth/components/register/register.component";
import {PictureDetailsComponent} from "./core/common-pages/picture-details/picture-details.component";
import {NotfoundComponent} from "./core/common-pages/notfound/notfound.component";
import {PostPictureComponent} from "./core/common-pages/post-picture/post-picture.component";
import {HomepageComponent} from "./core/common-pages/homepage/homepage.component";

function PostComponent() {

}

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: 'full'},
  {path: "home", component: HomepageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "picture/post", component: PostPictureComponent},
  {path: "picture/:id", component: PictureDetailsComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
