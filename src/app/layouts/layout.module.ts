import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './app-layout/header/header.component';
import { FooterComponent } from './app-layout/footer/footer.component';
import {CreateAccountBannerComponent} from "../shared/components/create-account-banner/create-account-banner.component";

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgOptimizedImage,
        CreateAccountBannerComponent,
    ],
  exports: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent
  ],
  providers: []
})
export class LayoutModule { }
