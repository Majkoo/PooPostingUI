import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';

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

  logout() {
    this.authService.logout();
  }

}
