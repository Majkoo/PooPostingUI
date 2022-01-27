import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../core/services/singletons/auth-service.service";
import {UserInfoModel} from "../../Models/UserInfoModel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
userInfo?: UserInfoModel;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }
}
