import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {LsJwtDetails} from "./Models/ApiModels/Post/LsJwtDetails";
import {ScrollServiceService} from "./Services/helpers/scroll-service.service";
import {CacheServiceService} from "./Services/data/cache-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  appTitle: string = "PicturesUI";
  isLoaded: boolean = false;

  constructor(
    private cacheService: CacheServiceService,
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
      jwtToken: this.cacheService.getLsJwtToken()!,
      uid: this.cacheService.getLsJwtUid()!,
    };
    if (jwtDetails.jwtToken != null && jwtDetails.uid != null) {
      this.httpService.postLsLoginRequest(jwtDetails)
        .subscribe(this.initialLoginObserver);
    }
    else {
      this.isLoaded = true;
    }
    setTimeout(() => {
      if (!this.cacheService.isCookiesAlertAccepted()) {
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
      if ((scrollBottom > 5000 ? scrollBottom/bodyHeight < 0.25 : true) && scrollBottom < 950) {
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

  canShowFooter() {
    return !this.router.url.startsWith('/home');
  }

  onCookieAlertAccept() {
    this.cacheService.cookiesAlertAccepted();
    this.messageService.clear("cookiesAlert");
  }

  private initialLoginObserver = {
    next: (val: UserInfoModel) => {
      if (val) {
        this.cacheService.cacheUserInfo(val);
        this.cacheService.updateUserAccount().then(() => {
          this.isLoaded = true;
        });
      }
    },
    error: () => {
      localStorage.clear();
      sessionStorage.clear();
      this.cacheService.loggedOnSubject.next(false);
      this.isLoaded = true;
    }
  }

}
