import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../../../Models/MenuModels/MenuItem";
import {MenusServiceService} from "../../../Services/data/menus-service.service";
import {MenuExpandableItem} from "../../../Models/MenuModels/MenuExpandableItem";
import {Router} from "@angular/router";
import {LocationServiceService} from "../../../Services/helpers/location-service.service";
import {SessionStorageServiceService} from "../../../Services/data/session-storage-service.service";
import {LocalStorageServiceService} from "../../../Services/data/local-storage-service.service";
import {UserDataServiceService} from "../../../Services/data/user-data-service.service";
import {HttpParamsServiceService} from "../../../Services/http/http-params-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() appTitle!: string;
  currentHomePage!: number;
  menuItems: MenuItem[];
  menuExpandableItems: MenuExpandableItem[];
  showSidebar: boolean = false;
  loggedIn: boolean;

  constructor(
    private userDataService: UserDataServiceService,
    private localStorageService: LocalStorageServiceService,
    private locationService: LocationServiceService,
    private menuService: MenusServiceService,
    private router: Router,
    private paramsService: HttpParamsServiceService,
  ) {
    this.menuItems = menuService.getMenuItems();
    this.menuExpandableItems = menuService.getExpandableMenuItems();
    this.loggedIn = this.userDataService.isUserLoggedOn();
  }

  ngOnInit(): void {
    this.userDataService.userSubject.subscribe({
      next: (val) => {
        this.loggedIn = val;
      }
    })
    this.currentHomePage = this.paramsService.getPageNumber();
  }

  logout() {
    this.localStorageService.logout();
    this.showSidebar = false;
    this.router.navigate(['logged-out']);
  }

  toHomePage() {
    this.showSidebar = false;
    this.locationService.goHomepageAndReset();
  }

}
