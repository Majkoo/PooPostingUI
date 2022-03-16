import { Injectable } from '@angular/core';
import {MenuItem} from "../../Models/MenuModels/MenuItem";
import {MenuExpandableItem} from "../../Models/MenuModels/MenuExpandableItem";

@Injectable({
  providedIn: 'root'
})
export class MenusServiceService {
  menuExpandableItems: MenuExpandableItem[];
  menuItems: MenuItem[];

  constructor() {
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
        url: "search"
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
            url: "my-account"
          },
          {
            label: "Obrazki",
            class: "bi bi-file-image",
            url: "my-account/picture"
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

  getMenuItems() {
   return this.menuItems;
  }
  getExpandableMenuItems() {
    return this.menuExpandableItems;
  }
}
