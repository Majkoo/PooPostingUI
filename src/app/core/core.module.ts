import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./common-pages/homepage/homepage.component";
import {NotfoundComponent} from "./common-pages/notfound/notfound.component";
import {PictureDetailsComponent} from "./common-pages/picture-details/picture-details.component";
import { PostPictureComponent } from './common-pages/post-picture/post-picture.component';
import {PictureComponent} from "./components/picture/picture.component";
import {MainDashboardModule} from "../main-dashboard/main-dashboard.module";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    HomepageComponent,
    NotfoundComponent,
    PictureDetailsComponent,
    PostPictureComponent,

    PictureComponent
  ],
  imports: [
    CommonModule,
    MainDashboardModule,
    AppRoutingModule
  ],
  exports: [
    HomepageComponent,
    NotfoundComponent,
    PictureDetailsComponent,
    PostPictureComponent,
    PictureComponent
  ]
})
export class CoreModule { }
