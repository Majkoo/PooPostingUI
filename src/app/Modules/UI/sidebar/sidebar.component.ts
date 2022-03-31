import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/Models/UserInfoModel';
import {Router} from "@angular/router";
import {MenusServiceService} from "../../../Services/data/menus-service.service";
import {MenuExpandableItem} from "../../../Models/MenuModels/MenuExpandableItem";
import {SessionStorageServiceService} from "../../../Services/data/session-storage-service.service";
import {LocalStorageServiceService} from "../../../Services/data/local-storage-service.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo!: UserInfoModel | null;
  menuExpandableItems: MenuExpandableItem[];
  loggedIn!: boolean;

  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private localStorageService: LocalStorageServiceService,
    private menuService: MenusServiceService,
    private router: Router,
  ) {
    this.menuExpandableItems = menuService.getExpandableMenuItems();
    this.loggedIn = this.sessionStorageService.isLoggedOn();
  }

  ngOnInit(): void {
    this.userInfo = this.sessionStorageService.getSessionInfo();
    this.sessionStorageService.userSubject.subscribe({
      next: (val) => {
        this.loggedIn = val;
        this.userInfo = this.sessionStorageService.getSessionInfo();
      }
    })
  }

  logout() {
    this.localStorageService.logout();
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
