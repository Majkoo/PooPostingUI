import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './Modules/core/core.module';
import { AuthModule } from './Modules/auth/auth.module';
import {UIModule} from "./Modules/UI/ui.module";
import { TokenInterceptorService } from './Modules/core/services/interceptors/token-interceptor.service';
import { ConfigServiceService } from './Modules/core/services/singletons/config-service.service';
import { HttpErrorInterceptorService } from './Modules/core/services/interceptors/http-error-interceptor.service';
import { AppConfiguration } from './Models/AppConfiguration';

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
    NgbModule,

    AuthModule,
    CoreModule,
    UIModule,
    BrowserAnimationsModule,
  ],
  providers: [
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
