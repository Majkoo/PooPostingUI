import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {UserInfoModel} from "../../../../Models/UserInfoModel";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  constructor(private auth: AuthServiceService) { }
  userInfo?: UserInfoModel;

  ngOnInit(): void {
    this.auth.getUserInfo();
  }

}
