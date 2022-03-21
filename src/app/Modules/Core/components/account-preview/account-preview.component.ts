import {Component, Input, OnInit} from '@angular/core';
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";

@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})
export class AccountPreviewComponent implements OnInit {

  @Input() account!: AccountModel;
  constructor(
    private configService: ConfigServiceService
  ) { }

  ngOnInit(): void {
    this.account.pictures.forEach(p => p.url.startsWith("http") ? null : p.url = this.configService.picturesUrl+p.url);
  }

}
