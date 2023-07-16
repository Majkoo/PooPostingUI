import {Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {LocationServiceService} from "../../../../shared/helpers/location-service.service";
import {AppCacheService} from "../../../../shared/state/app-cache.service";
import {AccountAuthService} from "../../../../data-access/account/account-auth.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {UserState} from "../../../../shared/utility/models/userState";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  locationService: LocationServiceService = inject(LocationServiceService);
  authService: AccountAuthService = inject(AccountAuthService);
  messageService: MessageService = inject(MessageService);
  cacheService: AppCacheService = inject(AppCacheService);

  form: FormGroup = new FormGroup({
    nickname: new FormControl<string>("", Validators.required),
    password: new FormControl<string>("", Validators.required),
  });
  formDisabled = false;

  private readonly subs: Subscription = new Subscription();

  onSubmit(): void {
    this.messageService.clear();
    this.disableForm();

    this.subs.add(
      this.authService
        .login(this.form.getRawValue())
        .subscribe(this.loginObserver)
    );

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private disableForm() {
    this.form.disable();
    this.formDisabled = true;
  }
  private enableForm() {
    this.form.enable();
    this.formDisabled = false;
  }


  private loginObserver = {
    next: (state: UserState): void => {
      if (state) {
        this.cacheService.cacheUserInfo(state);
        this.messageService.add({severity:'success', summary: 'Sukces', detail: 'Zalogowano pomyślnie.'});
        this.cacheService.loggedOnSubject.next(true);
        this.cacheService.updateUserAccount();
        this.locationService.goBack();
      }
    },
    error: (err: HttpErrorResponse) => {
      this.messageService.add(
        {
          severity:'error',
          summary: 'Niepowodzenie',
          detail: err.error,
          key: "login-failed"}
      );
      this.enableForm();
    }
  }

}
