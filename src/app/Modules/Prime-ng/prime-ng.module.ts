import { NgModule } from '@angular/core';
import {ChipsModule} from "primeng/chips";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {InputMaskModule} from "primeng/inputmask";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {AccordionModule} from "primeng/accordion";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {DataViewModule} from "primeng/dataview";
import {DividerModule} from "primeng/divider";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {CaptchaModule} from "primeng/captcha";
import {KeyFilterModule} from "primeng/keyfilter";
import {SelectButtonModule} from "primeng/selectbutton";
import {TableModule} from "primeng/table";

const PrimeNgComponents = [
  ChipsModule,
  RippleModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
  InputMaskModule,
  FileUploadModule,
  InputTextareaModule,
  CardModule,
  AccordionModule,
  PaginatorModule,
  ToastModule,
  MessageModule,
  DividerModule,
  TagModule,
  DialogModule,
  CaptchaModule,
  KeyFilterModule,
  SelectButtonModule,
  DataViewModule,
  TableModule

]

@NgModule({
  declarations: [],
  imports: [
    PrimeNgComponents
  ],
  exports: [
    PrimeNgComponents
  ]
})
export class PrimeNgModule { }
