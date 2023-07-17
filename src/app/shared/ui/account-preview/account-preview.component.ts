import {Component, Input} from '@angular/core';
import {AccountDto} from "../../utility/dtos/AccountDto";
import {PicturePreviewDto} from "../../utility/dtos/PicturePreviewDto";

@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})
export class AccountPreviewComponent {
  @Input() account!: AccountDto;
  @Input() picturePreviews: PicturePreviewDto[] = []
}
