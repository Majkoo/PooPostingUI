import {Component, Input, OnInit} from '@angular/core';
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account!: AccountModel;
  constructor(
    private configService: ConfigServiceService
  ) { }

  ngOnInit(): void {
    this.account.pictures.forEach(p => p.url.startsWith("http") ? null : p.url = this.configService.picturesUrl+p.url);
  }

}
