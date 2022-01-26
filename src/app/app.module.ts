import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared-components/navbar/navbar.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { PictureComponent } from './components/shared-components/picture/picture.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/shared-components/sidebar/sidebar.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PostComponent } from './components/pages/post/post.component';
import { PictureDetailsComponent } from './components/pages/picture-details/picture-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfigServiceService} from "./services/singletons/config-service.service";
import {AppConfiguration} from "./services/singletons/app-configuration";

export function initializerFn(configService: ConfigServiceService){
  return () => {
    return configService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    PictureComponent,
    SidebarComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    PictureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
