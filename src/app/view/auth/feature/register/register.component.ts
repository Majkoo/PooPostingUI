import {Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from 'src/CustomValidators';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {BlockSpace} from "../../../../shared/utility/regexes/blockSpace";
import {BlockSpaceOnStartEnd} from "../../../../shared/utility/regexes/blockSpaceOnStartEnd";
import {AccountAuthService} from "../../../../data-access/account/account-auth.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  authService: AccountAuthService = inject(AccountAuthService);
  message: MessageService = inject(MessageService);
  router: Router = inject(Router);

  form: FormGroup = new FormGroup({
      nickname: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      email: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(10),
        Validators.email
      ]),
      password: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      confirmPassword: new FormControl<string>("", [
        Validators.required
      ])},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    CustomValidators.mustMatch('password', 'confirmPassword'),
  );

  blockSpace: RegExp = BlockSpace;
  isName: RegExp = BlockSpaceOnStartEnd;
  formDisabled = false;

  isNickNameTaken = false;

  private readonly subs: Subscription = new Subscription();

  onSubmit(): void {
    this.disableForm();
    this.message.clear();
    this.isNickNameTaken = false;

    this.subs.add(
      this.authService
        .register(this.form.getRawValue())
        .subscribe(this.registerObserver)
    );
  }

  private disableForm() {
    this.form.disable();
    this.formDisabled = true;
  }
  private enableForm() {
    this.form.enable();
    this.formDisabled = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private registerObserver = {
    next: () => {
      this.router.navigate(["/auth/login"]);
      this.message.add({severity:'success', summary: 'Sukces', detail: 'Zarejestrowano pomyślnie. Przeniesiono cię na stronę logowania.'});
    },
    error: (err: HttpErrorResponse) => {
      if (err.error.errors && err.error.errors.Nickname) {
        this.message.add({
          severity:'error',
          summary: 'Niepowodzenie',
          detail: err.error.errors.Nickname
        });
        this.isNickNameTaken = true;
      }
      this.enableForm();
    }
  }
}
