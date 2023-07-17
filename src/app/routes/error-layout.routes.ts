import {Routes} from "@angular/router";
import {Error500Component} from "../view/500/error500/error500.component";
import {Error404Component} from "../view/404/error404/error404.component";
import {Error0Component} from "../view/0/error0/error0.component";

export const ERROR_LAYOUT_ROUTES: Routes = [
  {
    path: "500",
    component: Error500Component
  },
  {
    path: "404",
    component: Error404Component
  },
  {
    path: "0",
    component: Error0Component
  },
]
