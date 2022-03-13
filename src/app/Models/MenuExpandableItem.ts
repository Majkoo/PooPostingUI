import {MenuItem} from "./MenuItem";

export interface MenuExpandableItem {
  label: string;
  class: string;
  showWhileLoggedIn: boolean;
  showWhileLoggedOut: boolean;
  menuItems: MenuItem[];
}
