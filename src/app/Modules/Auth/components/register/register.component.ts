import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { CustomValidators } from 'src/CustomValidators';
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  blockSpace: RegExp = /[^\s]/;

  siteKey!: string;
  captchaPassed: boolean = false;
  awaitSubmit: boolean = false;
  isNickNameTaken: boolean = false;

  passCaptcha() {
    this.captchaPassed = true;
  }

  constructor(
    private httpService: HttpServiceService,
    private message: MessageService,
    private router: Router,
  ) {
    this.siteKey = "6Lfdv78eAAAAAJZcBW3ymM-3yaKieXyTTXFPNHcm";
  }

  ngOnInit(): void {
    this.isNickNameTaken = false;
    // @ts-ignore
    this.form = new FormGroup({
      nickname: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])},
      //@ts-ignore
      CustomValidators.mustMatch('password', 'confirmPassword'),
    )
  }

  onSubmit(): void {
    this.awaitSubmit = true;
    this.isNickNameTaken = false;
    this.message.clear();
    this.httpService.postRegisterRequest(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['login']);
        this.message.add({severity:'success', summary: 'Sukces', detail: 'Zarejestrowano pomyślnie. Przeniesiono cię na stronę logowania.'});
      },
      error: (err) => {
        this.awaitSubmit = false;
        this.message.add({severity:'error', summary: 'Sukces', detail: 'Nie udało się zarejestrować. Sprawdź błędy.'});
        if (err.error.errors || err.error.errors.Nickname === "That nickname is taken") {
          this.isNickNameTaken = true;
        }
      }
    });

  }
}
