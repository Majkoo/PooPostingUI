import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchPanelComponent} from "./components/search-panel/search-panel.component";
import {ModalPicComponent} from "./components/modals/modal-pic/modal-pic.component";
import {ModalInfoComponent} from "./components/modals/modal-info/modal-info.component";
import {PicturePreviewComponent} from "./components/picture-preview/picture-preview.component";
import {GlobalPaginatorComponent} from "./components/global-paginator/global-paginator.component";
import {AccountPreviewComponent} from "./components/account-preview/account-preview.component";
import {AccountSettingsComponent} from "./components/modals/account-settings/account-settings.component";
import {AccountAdminSettingsComponent} from "./components/modals/account-admin-settings/account-admin-settings.component";
import {PictureSkeletonComponent} from "./components/picture-skeleton/picture-skeleton.component";
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Error404Component} from "./pages/error404/error404.component";
import {Error500Component} from "./pages/error500/error500.component";
import {Error0Component} from "./pages/error0/error0.component";
import {DateAgoPipe} from "../../Pipes/date-ago.pipe";
import { PictureDetailsModalComponent } from './components/modals/picture-details-modal/picture-details-modal.component';
import {PictureShareComponent} from "./components/picture-share/picture-share.component";
import { CommentComponent } from './components/modals/picture-details-modal/comment/comment.component';

const SharedComponents = [
  Error404Component,
  Error500Component,
  Error0Component,
  SearchPanelComponent,
  ModalPicComponent,
  ModalInfoComponent,
  PicturePreviewComponent,
  GlobalPaginatorComponent,
  AccountPreviewComponent,
  AccountSettingsComponent,
  AccountAdminSettingsComponent,
  PictureSkeletonComponent,
  DateAgoPipe,
  PictureShareComponent,
]

@NgModule({
  declarations: [
    SharedComponents,
    PictureDetailsModalComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
    exports: [
        SharedComponents,
        PictureDetailsModalComponent
    ]
})
export class SharedModule { }
