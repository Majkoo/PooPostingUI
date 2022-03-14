import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../Models/MenuItem";
import {MenusServiceService} from "../../../Services/data/menus-service.service";
import {MenuExpandableItem} from "../../../Models/MenuExpandableItem";
import {Router} from "@angular/router";
import {HttpServiceService} from "../../../Services/http/http-service.service";
import {AuthServiceService} from "../../../Services/data/auth-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  menuItems: MenuItem[];
  menuExpandableItems: MenuExpandableItem[];
  showSidebar: boolean = false;
  loggedIn: boolean;

  constructor(
    private menuService: MenusServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private httpService: HttpServiceService,
  ) {
    this.menuItems = menuService.getMenuItems();
    this.menuExpandableItems = menuService.getExpandableMenuItems();
    this.loggedIn = this.authService.isUserLogged();
  }

  ngOnInit(): void {
    this.authService.userSubject.subscribe({
      next: (val) => {
        this.loggedIn = val;
      }
    })
  }

  logout() {
    this.authService.logout();
    this.showSidebar = false;
    this.router.navigate(['logged-out']);
  }

  toHomePage() {
    this.showSidebar = false;
    this.router.navigate(['/home']);
  }

}
