import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDetailsComponent} from "./pages/picture-details/picture-details.component";
import {CommentTableComponent} from "./pages/picture-details/comment-table/comment-table.component";
import {LikeTableComponent} from "./pages/picture-details/like-table/like-table.component";
import {PictureShareComponent} from "./pages/picture-details/picture-share/picture-share.component";
import {SharedModule} from "../Shared/shared.module";
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PictureRoutingModule} from "./picture-routing.module";
import { NsfwjsCheckComponent } from './pages/post-picture/nsfwjs-check/nsfwjs-check.component';
import { PostFormComponent } from './pages/post-picture/post-form/post-form.component';
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
    declarations: [
        PictureDetailsComponent,
        CommentTableComponent,
        LikeTableComponent,
        PictureShareComponent,
        NsfwjsCheckComponent,
        PostFormComponent,
    ],
    imports: [
      FormsModule,
        CommonModule,
        SharedModule,
        PrimeNgModule,
        ReactiveFormsModule,
        PictureRoutingModule,
      ImageCropperModule
    ],
  exports: [
    PostFormComponent,
    NsfwjsCheckComponent
  ]
})
export class PictureModule { }
