import {Component, isDevMode, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {AuthServiceService} from "./Services/data/auth-service.service";
import {UserInfoModel} from "./Models/UserInfoModel";
import {HttpServiceService} from "./Services/http/http-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public route: string = "";

  constructor(
    private authService: AuthServiceService,
    private httpService: HttpServiceService,
    private primeNgConfig: PrimeNGConfig,
    private messageService: MessageService,
    public router: Router
  ) {
    this.primeNgConfig.ripple = true;
  }

  ngOnInit(): void {
    if (isDevMode()){
      this.httpService
        .postLoginRequest({
          nickname: "ShrekTheCreator",
          password: "ILoveShrex"
        }).subscribe(this.adminLoginObserver)

    }
    // login from cookies
  }

  private adminLoginObserver = {
    next: (val: UserInfoModel) => {
      if (val) {
        this.authService.setUserInfo(val);
        this.messageService.add({
          severity:'warn',
          summary: 'Sukces',
          detail: `Pomyślnie zalogowano na konto ${val.accountDto.nickname}.`});
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.error === "Invalid nickname or password") {
        this.messageService.add({
          severity:'error',
          summary: 'Nie udało się automatycznie zalogować.',
          detail: 'Spróbuj edytować linijki 31 oraz 32 w pliku "src/app/app.component.ts"',
          sticky: true,
        });
      }
    }
  }

}
