import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./common-pages/homepage/homepage.component";
import { PostPictureComponent } from './common-pages/post-picture/post-picture.component';
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
import { LoggedOutComponent } from './common-pages/logged-out/logged-out.component';
import { PictureSettingsComponent } from './components/modals/picture-settings/picture-settings.component';
import { PictureAdminSettingsComponent } from './components/modals/picture-admin-settings/picture-admin-settings.component';
import { ModalPicComponent } from './components/modals/modal-pic/modal-pic.component';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { PopularComponent } from './common-pages/popular/popular.component';
import { Error0Component } from './common-pages/errors/error0/error0.component';
import {PictureDetailsComponent} from "./common-pages/picture-details/picture-details.component";
import { PictureShareComponent } from './common-pages/picture-details/picture-share/picture-share.component';
import { PicturePreviewComponent } from './components/picture-preview/picture-preview.component';
import {GlobalPaginatorComponent} from "./components/global-paginator/global-paginator.component";
import { AccountPreviewComponent } from './components/account-preview/account-preview.component';
import { AccountDetailsComponent } from './common-pages/account-details/account-details.component';
import { PictureTableComponent } from './common-pages/account-details/picture-table/picture-table.component';
import { AccountSettingsComponent } from './components/modals/account-settings/account-settings.component';
import { TosComponent } from './common-pages/tos/tos.component';
import {LikeTableComponent} from "./common-pages/picture-details/like-table/like-table.component";
import {CommentTableComponent} from "./common-pages/picture-details/comment-table/comment-table.component";

@NgModule({
  declarations: [
    HomepageComponent,
    PostPictureComponent,
    Error404Component,
    Error500Component,
    SearchComponent,
    SearchPanelComponent,
    MyAccountComponent,
    LoggedOutComponent,
    PictureDetailsComponent,
    PictureSettingsComponent,
    PictureAdminSettingsComponent,
    ModalPicComponent,
    ModalInfoComponent,
    PopularComponent,
    Error0Component,
    PictureShareComponent,
    PicturePreviewComponent,
    HomepageComponent,
    PostPictureComponent,
    GlobalPaginatorComponent,
    AccountPreviewComponent,
    AccountDetailsComponent,
    AccountSettingsComponent,
    LikeTableComponent,
    CommentTableComponent,
    PictureTableComponent,
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

  ]
})
export class CoreModule { }
