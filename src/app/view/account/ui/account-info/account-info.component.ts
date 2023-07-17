import {Component, Input} from '@angular/core';
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent {

  @Input() account!: AccountDto;

}
