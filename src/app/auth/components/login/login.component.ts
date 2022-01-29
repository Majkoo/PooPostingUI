import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserInfoModel} from "../../../Models/UserInfoModel";
import {ConfigServiceService} from "../../../core/services/singletons/config-service.service";
import {AuthServiceService} from "../../../core/services/singletons/auth-service.service";
import {HttpPostServiceService} from "../../../core/services/http-post-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;

  requiredFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigServiceService,
    private router: Router,
    private authService: AuthServiceService,
    private httpPostService: HttpPostServiceService) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nickname: '',
      password: ''
    });
  }

  submit(): void {
    this.httpPostService.login(this.form.getRawValue())
      .subscribe({
      next: (v) => {
        this.error = false;
        this.authService.setUserInfo(v);
        this.router.navigate(['/home'])
      },
      error: () => this.error = true
    })
  }

}
