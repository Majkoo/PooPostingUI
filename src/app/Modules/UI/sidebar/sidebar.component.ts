import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
userInfo?: UserInfoModel;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.authService.userSubject.subscribe({
      next: () => {
        this.userInfo = this.authService.getUserInfo();
      }
    })
  }

  logout() {
    this.authService.logout();
  }

  toPostPicture() {
    this.router.navigate(['picture/post']);
  }

  toMyAccount() {
    this.router.navigate(['my-account']);
  }

  toMyPictures() {
    this.router.navigate(['my-account/picture']);
  }

}
