import {Component, isDevMode, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {LocalStorageServiceService} from "./Services/data/local-storage-service.service";
import {SessionStorageServiceService} from "./Services/data/session-storage-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoaded: boolean = false;
  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private localStorageService: LocalStorageServiceService,
    private httpService: HttpServiceService,
    private primeNgConfig: PrimeNGConfig,
    private messageService: MessageService,
    public router: Router
  ) {
    this.primeNgConfig.ripple = true;
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

  private initialLoginObserver = {
    next: (val: UserInfoModel) => {
      if (val) {
        if (this.sessionStorageService.isSessionStorageEmpty()) {
          this.messageService.add({
            severity:'success',
            summary: 'Sukces',
            detail: `Automatycznie zalogowano na konto ${val.accountDto.nickname}.`});
        }
        this.sessionStorageService.updateSessionInfo(val);
        this.isLoaded = true;
      }
    },
    error: () => {
      localStorage.clear();
      sessionStorage.clear();
      this.sessionStorageService.userSubject.next(false);
      this.isLoaded = true;
    }
  }

}
