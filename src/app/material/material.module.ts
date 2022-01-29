import { NgModule } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {HammerModule} from "@angular/platform-browser";

const MaterialComponents = [
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatChipsModule,
  MatFormFieldModule,
  MatFormFieldModule,
  MatButtonModule,
  HammerModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
