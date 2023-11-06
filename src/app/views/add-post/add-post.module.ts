import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostRoutingModule } from './add-post-routing.module';
import {AddPostComponent} from "./add-post.component";
import { UploadComponent } from './upload/upload.component';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import {AngularCropperjsModule} from "angular-cropperjs";


@NgModule({
  declarations: [
    AddPostComponent,
    UploadComponent,
    DetailsComponent,
    ReviewComponent
  ],
  exports: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    AngularCropperjsModule
  ]
})
export class AddPostModule { }
