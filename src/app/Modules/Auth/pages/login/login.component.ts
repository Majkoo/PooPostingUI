import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {MessageService} from "primeng/api";
import {UserInfoModel} from "../../../../Models/UserInfoModel";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";
import {LocalStorageServiceService} from "../../../../Services/data/local-storage-service.service";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formDisabled: boolean = false;

  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private localStorageService: LocalStorageServiceService,
    private locationService: LocationServiceService,
    private httpService: HttpServiceService,
    private messageService: MessageService,
    private userDataService: UserDataServiceService,
    private title: Title
  ) {
    this.title.setTitle(`PicturesUI - Logowanie`);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.messageService.clear();
    this.disableForm();
    this.httpService
      .postLoginRequest(this.form.getRawValue())
      .subscribe({
        next: (v: UserInfoModel) => {
          if (v) {
            this.userDataService.userSubject.next(true);
            this.userDataService.setUserInfo(v);

            this.localStorageService.saveJwtToken(v.authToken);
            this.localStorageService.saveJwtUid(v.uid);

            this.messageService.add({severity:'success', summary: 'Sukces', detail: 'Zalogowano pomyślnie.'});
            this.locationService.goBack();
          }
        },
        error: (err) => {
          if (err.error === "Invalid nickname or password") {
            this.messageService.add({severity:'error', summary: 'Niepowodzenie', detail: 'Podano błędne dane logowania.', key: "login-failed"});
            this.enableForm();
          }
        }
      })
  }

  private disableForm() {
    this.form.disable();
    this.formDisabled = true;
  }
  private enableForm() {
    this.form.enable();
    this.formDisabled = false;
  }

}
