import { Injectable } from '@angular/core';
import {MenuItem} from "../../Models/MenuModels/MenuItem";
import {MenuExpandableItem} from "../../Models/MenuModels/MenuExpandableItem";
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class MenusServiceService {
  menuExpandableItems!: MenuExpandableItem[];
  menuItems!: MenuItem[];

  constructor(
  ) {
    this.refreshItems();
  }

  getMenuItems() {
    return this.menuItems;
  }
  getExpandableMenuItems() {
    return this.menuExpandableItems;
  }

  refreshItems() {
    this.menuItems = [
      {
        label: "Strona główna",
        class: "bi bi-house-door-fill",
        url: "home"
      },
      {
        label: "Popularne",
        class: "bi bi-graph-up-arrow",
        url: "popular"
      },
      {
        label: "Odkrywaj",
        class: "bi bi-search",
        url: "search/1"
      },
    ];
    this.menuExpandableItems = [
      {
        label: "Zaloguj się lub zarejestruj!",
        class: "bi bi-balloon-heart",
        showWhileLoggedIn: false,
        showWhileLoggedOut: true,
        menuItems: [
          {
            label: "Zaloguj się",
            class: "bi bi-box-arrow-in-left",
            url: "login"
          },
          {
            label: "Zarejestruj się",
            class: "bi bi-person-plus",
            url: "register"
          }
        ]
      },
      {
        label: "Moje Obrazki",
        class: "bi bi-images",
        showWhileLoggedIn: true,
        showWhileLoggedOut: false,
        menuItems: [
          {
            label: "Wstaw obrazek",
            class: "bi bi-cloud-upload",
            url: "picture/post"
          }
        ]
      },
      {
        label: "Moje Konto",
        class: "bi bi-person",
        showWhileLoggedIn: true,
        showWhileLoggedOut: false,
        menuItems: [
          {
            label: "Konto",
            class: "bi bi-person-circle",
            url: "my-account",
          },
          {
            label: "Wyloguj",
            class: "bi bi-box-arrow-right",
            url: "logged-out"
          }
        ]
      },
    ];
  }
}
