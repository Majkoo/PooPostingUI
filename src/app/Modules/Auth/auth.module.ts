import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import { AppRoutingModule } from 'src/app/app-routing.module';
import {InputTextModule} from "primeng/inputtext";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      MaterialModule,
      PrimeNgModule
    ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
