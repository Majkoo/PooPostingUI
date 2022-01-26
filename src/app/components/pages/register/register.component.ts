import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../../Models/LoginModel";
import {ConfigServiceService} from "../../../services/singletons/config-service.service";
import {RegisterModel} from "../../../Models/RegisterModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isNicknameValid = true;
  isNicknameFree = true;
  isEmailValid = true;
  isPasswordValid = true;
  isPassSubmitValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private config: ConfigServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.form  = this.formBuilder.group({
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  submit(): void {
    this.isNicknameValid = true;
    this.isNicknameFree = true;
    this.isEmailValid = true;
    this.isPasswordValid = true;
    this.isPassSubmitValid = true;

    this.http.post<RegisterModel>( this.config.apiUrl + 'account/register', this.form.getRawValue())
      .subscribe({
      next: (v) => {
        this.router.navigate(['/login'])
      },
      error: (err) => {
        if(err.error.errors.Nickname){
          if(err.error.errors.Nickname[0] === 'That nickname is taken'){
            this.isNicknameFree = false;
          }
          else {
            this.isNicknameValid = false;
          }
        }
        if(err.error.errors.Email){
          this.isEmailValid = false;
        }
        if(err.error.errors.Password){
          this.isPasswordValid = false;
        }
        if(err.error.errors.ConfirmPassword){
          this.isPassSubmitValid = false;
        }
      }
    })
  }

}
