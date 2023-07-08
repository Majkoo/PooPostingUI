import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureDetailsModalRoutingModule } from './picture-details-modal-routing.module';
import {PictureDetailsModalComponent} from "./picture-details-modal.component";
import {TagModule} from "primeng/tag";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {CommentModule} from "../../../shared/ui/comment/comment.module";
import {ChipsModule} from "primeng/chips";
import {SelectButtonModule} from "primeng/selectbutton";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {CommentSectionModule} from "../../../shared/feature/comment-section/comment-section.module";
import {VoteButtonModule} from "../../../shared/feature/vote-button/vote-button.module";
import {EditPictureModule} from "../../../shared/feature/edit-picture/edit-picture.module";


@NgModule({
  declarations: [
    PictureDetailsModalComponent
  ],
  exports: [
    PictureDetailsModalComponent
  ],
  imports: [
    CommonModule,
    PictureDetailsModalRoutingModule,
    TagModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ButtonModule,
    CommentModule,
    ChipsModule,
    SelectButtonModule,
    FormsModule,
    RippleModule,
    DialogModule,
    CommentSectionModule,
    VoteButtonModule,
    EditPictureModule
  ]
})
export class PictureDetailsModalModule { }
