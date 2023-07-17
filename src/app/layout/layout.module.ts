import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';
import {RouterModule} from "@angular/router";
import {NavbarModule} from "../shared/ui/navbar/navbar.module";
import {SidebarModule} from "../shared/ui/sidebar/sidebar.module";

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    SidebarModule,
  ],
  exports: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent
  ],
  providers: []
})
export class LayoutModule { }
