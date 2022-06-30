import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountModel} from "../../../../../Models/ApiModels/Get/AccountModel";
import {SelectOption} from "../../../../../Models/QueryModels/SelectOption";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../../../CustomValidators";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() account!: AccountModel;
  selectOptions: SelectOption[];
  selectValue: SelectOption;

  blockSpace: RegExp = /[^\s]/;

  changePass!: UntypedFormGroup;
  changeEmail!: UntypedFormGroup;

  awaitSubmit: boolean = false;

  constructor(
    private httpService: HttpServiceService,
    private messageService: MessageService,
  ) {
    this.selectOptions = [
      { name: "Hasło", class: "bi bi-lock"},
      { name: "E-mail", class: "bi bi-envelope"},
    ];
    this.selectValue = { name: "none", class: "none" };
    this.resetForms();

  }

  submitChangePass() {
    this.awaitSubmit = true;
    this.httpService.putAccountRequest(this.changePass.getRawValue())
      .subscribe(this.putAccountObserver);
  }
  submitChangeEmail() {
    this.awaitSubmit = true;
    this.httpService.putAccountRequest(this.changeEmail.getRawValue())
      .subscribe(this.putAccountObserver);
  }

  putAccountObserver = {
    next: (val: boolean) => {
      let email = this.changeEmail.getRawValue().email;
      this.awaitSubmit = false;
      if(val) {
        if(email) this.account.email = email;
        this.messageService.add({
          severity: "success",
          summary: "Sukces",
          detail: "Pomyślnie zmieniono dane twojego konta!"
        });
        this.onSubmit.emit();
        this.resetForms();
        return;
      }
      this.messageService.add({
        severity: "error",
        summary: "Niepowodzenie",
        detail: "Nie udało się zmienić danych twojego konta. Sprawdź logi."
      });
    },
    error: () => {
      this.awaitSubmit = false;
    }
  }

  resetForms() {
    this.changePass = new UntypedFormGroup({
        password: new UntypedFormControl("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128)
        ]),
        confirmPassword: new UntypedFormControl("", [
          Validators.required,
        ]),
      },
      //@ts-ignore
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
    this.changeEmail = new UntypedFormGroup({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ])
    })
  }
}
