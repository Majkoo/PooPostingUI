import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./common-pages/homepage/homepage.component";
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
import { PicturesViewComponent } from './components/pictures-view/pictures-view.component';
import { LoggedOutComponent } from './common-pages/logged-out/logged-out.component';
import { PictureSettingsComponent } from './components/modals/picture-settings/picture-settings.component';
import {PictureDetailsComponent} from "./components/modals/picture-details/picture-details.component";
import { PictureAdminSettingsComponent } from './components/modals/picture-admin-settings/picture-admin-settings.component';
import { ModalPicComponent } from './components/modals/modal-pic/modal-pic.component';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { PopularComponent } from './common-pages/popular/popular.component';
import { Error0Component } from './common-pages/errors/error0/error0.component';
import { LikeTableComponent } from './components/modals/like-table/like-table.component';
import { CommentTableComponent } from './components/modals/comment-table/comment-table.component';
import { TosComponent } from './common-pages/tos/tos.component';

@NgModule({
  declarations: [
    HomepageComponent,
    PostPictureComponent,
    PictureComponent,
    Error404Component,
    Error500Component,
    SearchComponent,
    SearchPanelComponent,
    MyAccountComponent,
    AccountComponent,
    MyPicturesComponent,
    PicturesViewComponent,
    LoggedOutComponent,
    PictureDetailsComponent,
    PictureSettingsComponent,
    PictureAdminSettingsComponent,
    ModalPicComponent,
    ModalInfoComponent,
    PopularComponent,
    Error0Component,
    LikeTableComponent,
    CommentTableComponent,
    TosComponent,
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
