import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "../../../Models/RegisterModel";
import {Router} from "@angular/router";
import {ConfigServiceService} from "../../../core/services/singletons/config-service.service";
import { ErrorStateMatcher } from '@angular/material/core';
import {HttpPostServiceService} from "../../../core/services/http-post-service.service";

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

  requiredFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigServiceService,
    private router: Router,
    private httpPostService: HttpPostServiceService) { }

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


      this.httpPostService.register(this.form.getRawValue()).subscribe({
      next: (v) => {
        this.router.navigate(['/login'])
      },
        // server side validation
      error: (err) => {
        console.error(err)
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
