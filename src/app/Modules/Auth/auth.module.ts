import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from 'src/app/app-routing.module';
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {LoggedOutComponent} from "./components/logged-out/logged-out.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoggedOutComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      PrimeNgModule
    ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
