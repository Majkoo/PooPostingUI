import {Component, inject, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CreateAccountDto} from "../../shared/utility/dtos/CreateAccountDto";
import {validationErrorAnimation} from "../../shared/utility/animations/validationErrorAnimation";
import {AuthService} from "../../services/data-access/account/auth.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styles: [`
    .input {
      @apply border-1 w-full py-2 px-3 rounded-lg transition ease-in-out
    }
  `],
  animations: [
    validationErrorAnimation,
  ]
})
export class RegisterComponent implements OnDestroy {
  private sub = new Subscription();
  awaitSubmit = false;
  createAccountDto: CreateAccountDto = {
    confirmPassword: "",
    email: "",
    nickname: "",
    password: ""
  };

  private authService = inject(AuthService);
  private msgService = inject(ToastrService);
  private router = inject(Router);

  onSubmit() {
    if (this.awaitSubmit) return;

    this.awaitSubmit = true;

    this.sub.add(
      this.authService.register(this.createAccountDto).subscribe({
        next: () => {
          this.msgService.success("Successfully created an account", "Success");
          this.awaitSubmit = false;
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          this.msgService.error(err.error.errors['Nickname'][0] ?? "Something went wrong", "Error");
          this.awaitSubmit = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
