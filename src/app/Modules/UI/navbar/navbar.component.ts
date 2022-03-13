import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../Models/MenuItem";
import {MenusServiceService} from "../../../Services/data/menus-service.service";
import {MenuExpandableItem} from "../../../Models/MenuExpandableItem";
import {AuthServiceService} from "../../../Services/data/auth-service.service";
import {Router} from "@angular/router";

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
    private auth: AuthServiceService,
    private router: Router
  ) {
    this.menuItems = menuService.getMenuItems();
    this.menuExpandableItems = menuService.getExpandableMenuItems();
    this.loggedIn = this.auth.isUserLogged();
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe({
      next: (val) => {
        this.loggedIn = val;
      }
    })
  }

  logout() {
    this.auth.logout();
    this.showSidebar = false;
    this.router.navigate(['logged-out']);
  }


}
