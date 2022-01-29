import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {MainDashboardModule} from "./main-dashboard/main-dashboard.module";
import {AppConfiguration} from "./core/services/singletons/app-configuration";
import {ConfigServiceService} from "./core/services/singletons/config-service.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MainDashboardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: AppConfiguration,
      deps: [HttpClient],
      useExisting: ConfigServiceService
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
