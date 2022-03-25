import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {MessageService} from "primeng/api";
import {UserInfoModel} from "../../../../Models/UserInfoModel";
import {Location} from "@angular/common";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  awaitSubmit: boolean = false;

  constructor(
    private locationService: LocationServiceService,
    private authService: AuthServiceService,
    private httpService: HttpServiceService,
    private messageService: MessageService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.awaitSubmit = true;
    this.messageService.clear();
    this.httpService
      .postLoginRequest(this.form.getRawValue())
      .subscribe({
        next: (v: UserInfoModel) => {
          if (v) {
            this.authService.setUserInfo(v);
            this.messageService.add({severity:'success', summary: 'Sukces', detail: 'Zalogowano pomyślnie.'});
            this.locationService.goHomepage();
            this.awaitSubmit = false;
          }
        },
        error: (err) => {
          if (err.error === "Invalid nickname or password") {
            this.messageService.add({severity:'error', summary: 'Niepowodzenie', detail: 'Podano błędne dane logowania.', key: "login-failed"});
            this.awaitSubmit = false;
          }
        }
      })
  }

}
