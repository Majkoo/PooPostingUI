import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import {RouterModule} from "@angular/router";
import {LayoutModule} from "./layouts/layout.module";
import { ViewPictureModalComponent } from './shared/components/view-picture-modal/view-picture-modal.component';
import {NgOptimizedImage} from "@angular/common";
import {UrlTransformModule} from "./shared/utility/pipes/url-transform/url-transform.module";
import {MessageService} from "primeng/api";
import {TokenInterceptorService} from "./shared/utility/interceptors/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    ViewPictureModalComponent,
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    LayoutModule,
    NgOptimizedImage,
    UrlTransformModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptorService,
    //   multi: true,
    // },
    {
      provide: MessageService,
      useClass: MessageService
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
