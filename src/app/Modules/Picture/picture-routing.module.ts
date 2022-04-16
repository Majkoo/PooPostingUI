import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostPictureComponent} from "./pages/post-picture/post-picture.component";
import {IsNotLoggedOnRouteGuardGuard} from "../../Services/guards/is-not-logged-on-route-guard.guard";
import {PictureDetailsComponent} from "./pages/picture-details/picture-details.component";

const routes: Routes = [
  {
    path: "post",
    component: PostPictureComponent,
    canActivate: [IsNotLoggedOnRouteGuardGuard],
  },
  {
    path: ":id",
    component: PictureDetailsComponent,
  },
  {
    path: "**",
    redirectTo: "/error404"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureRoutingModule { }
