import { NgModule } from '@angular/core';
import {MatIcon, MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {HammerModule} from "@angular/platform-browser";
import {TimeagoModule} from "ngx-timeago";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";

const MaterialComponents = [
  MatInputModule,
  MatPaginatorModule,
  MatChipsModule,
  MatFormFieldModule,
  HammerModule,
  TimeagoModule.forRoot(),

]

@NgModule({
  imports: [
    MaterialComponents,
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
