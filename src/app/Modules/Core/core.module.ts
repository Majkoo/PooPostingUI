import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./common-pages/homepage/homepage.component";
import {PictureDetailsComponent} from "./common-pages/picture-details/picture-details.component";
import { PostPictureComponent } from './common-pages/post-picture/post-picture.component';
import {PictureComponent} from "./components/picture/picture.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ImageCropperModule } from 'ngx-image-cropper';
import {Error404Component} from "./common-pages/errors/error404/error404.component";
import {Error500Component} from "./common-pages/errors/error500/error500.component";
import { SearchComponent } from './common-pages/search/search.component';
import {UIModule} from "../UI/ui.module";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { MyAccountComponent } from './common-pages/my-account/my-account.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {TimeagoModule} from "ngx-timeago";
import { AccountComponent } from './components/account/account.component';
import { MyPicturesComponent } from './common-pages/my-pictures/my-pictures.component';



@NgModule({
  declarations: [
    HomepageComponent,
    PictureDetailsComponent,
    PostPictureComponent,
    PictureComponent,
    Error404Component,
    Error500Component,
    SearchComponent,
    SearchPanelComponent,
    MyAccountComponent,
    AccountComponent,
    MyPicturesComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PrimeNgModule,
    TimeagoModule.forRoot(),
  ],
  exports: [
    HomepageComponent,
    PictureDetailsComponent,
    PostPictureComponent,
    PictureComponent
  ]
})
export class CoreModule { }
