import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserState} from "../../../../shared/utils/models/userState";
import {LocationServiceService} from "../../../../shared/helpers/location-service.service";
import {Title} from "@angular/platform-browser";
import {AppCacheService} from "../../../../shared/state/app-cache.service";
import {AccountAuthService} from "../../../../data-access/account/account-auth.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
  title: Title = inject(Title);

  form: FormGroup = new FormGroup({
    nickname: new FormControl<string>("", Validators.required),
    password: new FormControl<string>("", Validators.required),
  });
  formDisabled: boolean = false;

  private readonly subs: Subscription = new Subscription();

  constructor() {
    this.title.setTitle(`PooPosting - Logowanie`);
  }
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
