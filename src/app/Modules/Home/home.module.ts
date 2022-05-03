import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {PopularComponent} from "./pages/popular/popular.component";
import {PictureSliderCardComponent} from "./pages/popular/picture-slider-card/picture-slider-card.component";
import {PostPictureComponent} from "../Picture/pages/post-picture/post-picture.component";
import {SearchComponent} from "./pages/search/search.component";
import {SharedModule} from "../Shared/shared.module";
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import {PictureModule} from "../Picture/picture.module";

@NgModule({
  declarations: [
    HomepageComponent,
    PopularComponent,
    PictureSliderCardComponent,
    PostPictureComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PictureModule
  ]
})
export class HomeModule { }
