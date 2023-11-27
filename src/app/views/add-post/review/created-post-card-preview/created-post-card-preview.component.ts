import {Component, inject, Input} from '@angular/core';
import {CreatedPostData} from "../../models/createdPostData";
import {AccountService} from "../../../../services/data-access/account/account.service";
import {Observable} from "rxjs";
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";
import {AuthService} from "../../../../services/data-access/account/auth.service";
import {fadeInAnimation} from "../../../../shared/utility/animations/fadeInAnimation";

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
