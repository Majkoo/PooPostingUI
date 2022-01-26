import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ConfigServiceService} from "../../../services/singletons/config-service.service";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../../services/singletons/auth-service.service";
import {UserInfoModel} from "../../../Models/UserInfoModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private config: ConfigServiceService,
    private router: Router,
    private authService: AuthServiceService) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nickname: '',
      password: ''
    });
  }

  submit(): void {
    this.http.post<UserInfoModel>(this.config.apiUrl + "account/login", this.form.getRawValue(), {
      responseType: "json",
      withCredentials: true
    }).subscribe({
      next: (v) => {
        this.authService.setUserInfo(v);
        this.router.navigate(['/home'])
      },
      error: () => this.error = true
    })
  }

}
