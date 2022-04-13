import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {LocalStorageServiceService} from "./Services/data/local-storage-service.service";
import {ConfigServiceService} from "./Services/data/config-service.service";
import {UserDataServiceService} from "./Services/data/user-data-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoaded: boolean = false;
  appTitle: string;
  constructor(
    private userDataService: UserDataServiceService,
    private localStorageService: LocalStorageServiceService,
    private httpService: HttpServiceService,
    private primeNgConfig: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router,
    private config: ConfigServiceService,
  ) {
    this.primeNgConfig.ripple = true;
    this.appTitle = config.appTitle;
  }

  ngOnInit(): void {
    let jwtDetails = this.localStorageService.getJwtDetails();
    if (jwtDetails) {
      this.httpService.postLsLoginRequest(jwtDetails)
        .subscribe(this.initialLoginObserver);
    } else {
      this.isLoaded = true;
    }
  }

  canShowSidebar() {
    return !this.router.url.startsWith('/error') &&
      this.router.url !== '/login' &&
      this.router.url !== '/register' &&
      this.router.url !== '/logged-out';
  }

  private initialLoginObserver = {
    next: (val: UserInfoModel) => {
      if (val) {
        this.userDataService.setUserInfo(val);
        this.isLoaded = true;
      }
    },
    error: () => {
      localStorage.clear();
      sessionStorage.clear();
      this.userDataService.userSubject.next(false);
      this.isLoaded = true;
    }
  }

}
