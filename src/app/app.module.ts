import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UIModule} from "./Modules/UI/ui.module";
import { AppConfiguration } from './Models/JsonModels/AppConfiguration';
import { ConfigServiceService } from './Services/data/config-service.service';
import { TokenInterceptorService } from './Services/interceptors/token-interceptor.service';
import { HttpErrorInterceptorService } from './Services/interceptors/http-error-interceptor.service';
import { MessageService} from "primeng/api";
import {PrimeNgModule} from "./Modules/Prime-ng/prime-ng.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SharedModule} from "./Modules/Shared/shared.module";
import {HomeModule} from "./Modules/Home/home.module";
import { DateAgoPipe } from './Pipes/date-ago.pipe';
import {ReportModule} from "./Modules/Report/report.module";
import {BrowserModule} from "@angular/platform-browser";

export function initializerFn(configService: ConfigServiceService){
  return () => {
    return configService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    PrimeNgModule,
    SharedModule,
    ReportModule,
    HomeModule,
    UIModule,
  ],
  providers: [
    MessageService,
    {
      provide: AppConfiguration,
      deps: [HttpClient],
      useExisting: ConfigServiceService
    },
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
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigServiceService],
      useFactory: initializerFn
    }
  ],
  exports: [
    DateAgoPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
