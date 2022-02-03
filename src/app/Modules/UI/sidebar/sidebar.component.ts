import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {AuthServiceService} from "../../core/services/singletons/auth-service.service";

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
