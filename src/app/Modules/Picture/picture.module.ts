import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDetailsComponent} from "./pages/picture-details/picture-details.component";
import {CommentTableComponent} from "./pages/picture-details/comment-table/comment-table.component";
import {LikeTableComponent} from "./pages/picture-details/like-table/like-table.component";
import {PictureShareComponent} from "./pages/picture-details/picture-share/picture-share.component";
import {SharedModule} from "../Shared/shared.module";
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PictureRoutingModule} from "./picture-routing.module";

@NgModule({
  declarations: [
    PictureDetailsComponent,
    CommentTableComponent,
    LikeTableComponent,
    PictureShareComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
    PictureRoutingModule,
  ],
})
export class PictureModule { }
