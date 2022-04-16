import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimeNgModule} from "../Prime-ng/prime-ng.module";
import {SharedModule} from "../Shared/shared.module";

import {MyAccountComponent} from "./pages/my-account/my-account.component";
import {AccountDetailsComponent} from "./pages/account-details/account-details.component";
import {PictureTableComponent} from "./pages/account-details/picture-table/picture-table.component";
import {AccountRoutingModule} from "./account-routing.module";

@NgModule({
  declarations: [
    MyAccountComponent,
    AccountDetailsComponent,
    PictureTableComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    SharedModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
