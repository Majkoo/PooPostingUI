import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService} from "primeng/api";
import { environment } from '../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TitleCasePipe } from "@angular/common";
import {HomeShellModule} from "./view/home/feature/home-shell/home-shell.module";
import {NavbarModule} from "./shared/ui/navbar/navbar.module";
import {SidebarModule} from "./shared/ui/sidebar/sidebar.module";
import {ToastModule} from "primeng/toast";
import {Error0Component} from "./view/0/error0/error0.component";
import {Error404Component} from "./view/404/error404/error404.component";
import {Error500Component} from "./view/500/error500/error500.component";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TokenInterceptorService} from "./shared/utility/interceptors/token-interceptor.service";
import {HttpErrorInterceptorService} from "./shared/utility/interceptors/http-error-interceptor.service";
import {RouterModule} from "@angular/router";
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  declarations: [
    AppComponent,
    Error0Component,
    Error404Component,
    Error500Component
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HomeShellModule,
    NavbarModule,
    SidebarModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    LayoutModule,
  ],
  providers: [
    TitleCasePipe,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
