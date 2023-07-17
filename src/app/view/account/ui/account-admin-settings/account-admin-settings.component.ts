import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";

@Component({
  selector: 'app-account-admin-settings',
  templateUrl: './account-admin-settings.component.html',
  styleUrls: ['./account-admin-settings.component.scss']
})
export class AccountAdminSettingsComponent {

  @Input() account!: AccountDto
  @Output() ban = new EventEmitter<void>();

  banPhrase = "";

  banAccount() {
    this.banPhrase = "";
    this.ban.emit();
  }

}
