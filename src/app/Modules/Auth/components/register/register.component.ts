import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AlertifyServiceService } from 'src/app/Services/alertify-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { CustomValidators } from 'src/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isNickNameTaken: boolean = false;

  constructor(
    private httpService: HttpServiceService,
    private alertify: AlertifyServiceService,
    private router: Router,
  ) { }

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
    this.isNickNameTaken = false;
    this.httpService.postRegisterRequest(this.form.getRawValue()).subscribe({
      next: (v) => {
        this.router.navigate(['login']);
        this.alertify.success("Zarejestrowano pomyślnie. Przeniesiono cię na stronę logowania.")
      },
      error: () => {
        this.alertify.error("Rejestracja nieudana. Sprawdź błędy.")
        this.isNickNameTaken = true;
      }
    });

  }
}
