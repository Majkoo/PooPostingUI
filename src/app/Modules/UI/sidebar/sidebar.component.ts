import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';
import {Router} from "@angular/router";
import {MenusServiceService} from "../../../Services/data/menus-service.service";
import {MenuExpandableItem} from "../../../Models/MenuExpandableItem";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo?: UserInfoModel;
  menuExpandableItems: MenuExpandableItem[];
  loggedIn!: boolean;

  constructor(
    private authService: AuthServiceService,
    private menuService: MenusServiceService,
    private router: Router,
  ) {
    this.menuExpandableItems = menuService.getExpandableMenuItems();
    this.loggedIn = this.authService.isUserLogged();
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.authService.userSubject.subscribe({
      next: (val) => {
        this.loggedIn = val;
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
