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
import { AppConfiguration } from './Models/AppConfiguration';
import { RouteGuardGuard } from './Services/guards/route-guard.guard';
import { ConfigServiceService } from './Services/data/config-service.service';
import { TokenInterceptorService } from './Services/interceptors/token-interceptor.service';
import { HttpErrorInterceptorService } from './Services/interceptors/http-error-interceptor.service';

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
    RouteGuardGuard,
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
