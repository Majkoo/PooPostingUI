import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {LocalStorageServiceService} from "./Services/data/local-storage-service.service";
import {UserDataServiceService} from "./Services/data/user-data-service.service";
import {LsJwtDetails} from "./Models/ApiModels/LsJwtDetails";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  appTitle: string = "PicturesUI";
  isLoaded: boolean = false;
  constructor(
    private userDataService: UserDataServiceService,
    private localStorageService: LocalStorageServiceService,
    private httpService: HttpServiceService,
    private primeNgConfig: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.primeNgConfig.ripple = true;
  }

  ngOnInit(): void {
    let jwtDetails: LsJwtDetails = {
      jwtToken: `${this.localStorageService.getJwtToken()}`,
      uid: `${this.localStorageService.getJwtUid()}`
    };
    if (this.localStorageService.isUserDataSaved()) {
      this.httpService.postLsLoginRequest(jwtDetails)
        .subscribe(this.initialLoginObserver);
    } else {
      this.isLoaded = true;
    }
    setTimeout(() => {
      if (!this.localStorageService.isCookiesAlertAccepted()) {
        this.messageService.add({
          key: "cookiesAlert",
          sticky: true,
          closable: false,
          severity: "success",
          summary: "Ten serwis korzysta z ciasteczek.",
          detail: "Pozostając na tej witrynie, zgadzasz się na ich używanie."
        })
      }
    }, 5000);
  }

  canShowSidebar() {
    return  !this.router.url.startsWith('/error') &&
            !this.router.url.startsWith('/auth');
  }

  onCookieAlertAccept() {
    this.localStorageService.cookiesAlertAccepted();
    this.messageService.clear("cookiesAlert");
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
