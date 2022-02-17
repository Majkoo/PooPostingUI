import {Component, Input, OnInit} from '@angular/core';
import {AccountModel} from "../../../../Models/AccountModel";
import {LikeModel} from "../../../../Models/LikeModel";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";

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
