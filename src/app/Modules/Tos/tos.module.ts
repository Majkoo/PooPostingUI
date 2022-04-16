import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TosComponent } from './tos/tos.component';
import { RulebookComponent } from './rulebook/rulebook.component';
import {TosRoutingModule} from "./tos-routing.module";

@NgModule({
  declarations: [
    TosComponent,
    RulebookComponent
  ],
  imports: [
    CommonModule,
    TosRoutingModule,
  ]
})
export class TosModule { }
