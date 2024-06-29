import {Component, inject, Input} from '@angular/core';
import {CreatedPostData} from "../../models/createdPostData";
import {Observable} from "rxjs";
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";
import {fadeInAnimation} from "../../../../shared/utility/animations/fadeInAnimation";
import {AccountService} from "../../../../services/api/account/account.service";
import {AuthService} from "../../../../services/api/account/auth.service";

@Component({
  selector: 'pp-created-post-card-preview',
  templateUrl: './created-post-card-preview.component.html',
  styles: [],
  animations: [fadeInAnimation]
})
export class CreatedPostCardPreviewComponent {
  @Input({required: true}) postData!: CreatedPostData;
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  acc$: Observable<AccountDto> | undefined;

  constructor() {
    const uid = this.authService.getJwtData()?.uid;
    this.acc$ = uid ? this.accountService.getById(uid) : undefined;
  }
}
