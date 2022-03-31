import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './Modules/Core/core.module';
import { AuthModule } from './Modules/Auth/auth.module';
import {UIModule} from "./Modules/UI/ui.module";
import { AppConfiguration } from './Models/AppConfiguration';
import { ConfigServiceService } from './Services/data/config-service.service';
import { TokenInterceptorService } from './Services/interceptors/token-interceptor.service';
import { HttpErrorInterceptorService } from './Services/interceptors/http-error-interceptor.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {PrimeNgModule} from "./Modules/prime-ng/prime-ng.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    UIModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    MessageService,
    ConfirmationService,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
