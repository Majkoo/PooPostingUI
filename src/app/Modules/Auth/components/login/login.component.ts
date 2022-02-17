import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private httpService: HttpServiceService,
    private message: MessageService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.message.clear();
    this.httpService.postLoginRequest(this.form.getRawValue())
      .subscribe({
        next: (v) => {
          this.authService.setUserInfo(v);
          this.message.add({severity:'success', summary: 'Sukces', detail: 'Zalogowano pomyślnie.'});
          this.router.navigate(['home']);
        },
        error: () => {
          this.message.add({severity:'error', summary: 'Niepowodzenie', detail: 'Podano błędne dane logowania.', key: "login-failed"});
        }
    })
  }

}
