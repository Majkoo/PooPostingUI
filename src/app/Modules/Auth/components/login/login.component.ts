import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {MessageService} from "primeng/api";
import {UserInfoModel} from "../../../../Models/UserInfoModel";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";
import {LocalStorageServiceService} from "../../../../Services/data/local-storage-service.service";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  awaitSubmit: boolean = false;

  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private localStorageService: LocalStorageServiceService,
    private locationService: LocationServiceService,
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
            this.sessionStorageService.userSubject.next(true);
            this.sessionStorageService.updateSessionInfo(v);
            this.localStorageService.saveJwtDetails({jwtToken: v.authToken, guid: v.accountDto.id});
            this.messageService.add({severity:'success', summary: 'Sukces', detail: 'Zalogowano pomyślnie.'});
            this.locationService.goBack();
            this.awaitSubmit = false;
          }
        },
        error: (err) => {
          if (err.error === "Invalid nickname or password") {
            this.messageService.add({severity:'error', summary: 'Niepowodzenie', detail: 'Podano błędne dane logowania.', key: "login-failed"});
          }
          this.awaitSubmit = false;
        }
      })
  }

}
