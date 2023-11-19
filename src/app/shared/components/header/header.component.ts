import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/data-access/account/auth.service";
import {AccountService} from "../../../services/data-access/account/account.service";
import {Observable} from "rxjs";
import {AccountDto} from "../../utility/dtos/AccountDto";

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private accountService = inject(AccountService);

  account$: Observable<AccountDto> | undefined;

  onLogoClick() {
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.account$ = this.accountService.getMe();
    }
  }

}
