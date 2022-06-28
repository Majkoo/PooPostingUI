import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {LocalStorageServiceService} from "./Services/data/local-storage-service.service";
import {UserDataServiceService} from "./Services/data/user-data-service.service";
import {LsJwtDetails} from "./Models/ApiModels/Post/LsJwtDetails";
import {ScrollServiceService} from "./Services/helpers/scroll-service.service";

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
    private scrollService: ScrollServiceService,
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
    }
    else {
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

    document.body.addEventListener('scroll', () => {
      let body = document.querySelector('body')!;
      let scrollBottom = (body.scrollHeight - (body.scrollTop + body.offsetHeight));
      let bodyHeight = (body.scrollHeight - body.offsetHeight);
      if ((scrollBottom > 5000 ? scrollBottom/bodyHeight < 0.25 : true) && scrollBottom < 1100) {
        if (!this.scrollService.bottomSubject.value) {
          this.scrollService.bottomSubject.next(true);
        }
      } else {
        if (this.scrollService.bottomSubject.value) {
          this.scrollService.bottomSubject.next(false);
        }
      }
    })
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
