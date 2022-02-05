import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AlertifyServiceService } from 'src/app/Services/alertify-service.service';
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigServiceService,
    private authService: AuthServiceService,
    private httpService: HttpServiceService,
    private alertify: AlertifyServiceService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submit(): void {
    this.error = false;
    this.httpService.postLoginRequest(this.form.getRawValue())
      .subscribe({
        next: (v) => {
          this.authService.setUserInfo(v);
          this.alertify.success("Zalogowano pomyślnie")
          this.router.navigate(['home']);
        },
        error: () => {
          this.error = true
          this.alertify.error("Podano błędne dane logowania")
        }
    })
  }

}
