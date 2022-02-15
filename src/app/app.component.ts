import { Component } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public route: string = "";

  constructor(
    private primeNgConfig: PrimeNGConfig,
    public router: Router
  ) {
    this.primeNgConfig.ripple = true;
  }
}
