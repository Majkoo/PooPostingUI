import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TosComponent} from "./tos/tos.component";
import {RulebookComponent} from "./rulebook/rulebook.component";

const routes: Routes = [
  {
    path: "privacy-policy",
    component: TosComponent
  },
  {
    path: "rulebook",
    component: RulebookComponent
  },
  {
    path: "**",
    redirectTo: "/error404"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TosRoutingModule { }
