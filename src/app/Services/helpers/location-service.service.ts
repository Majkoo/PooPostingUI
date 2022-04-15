import { Injectable } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HttpParamsServiceService} from "../http/http-params-service.service";

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(
    private paramsService: HttpParamsServiceService,
    private location: Location,
    private router: Router
  ) { }

  goBack(): void {
    //@ts-ignore
    if(this.location.getState().navigationId > 1 && window.history.length > 2) {
      this.location.back();
    } else {
      this.goHomepage();
    }
  }

  goHomepageAndReset(): void {
    this.router.navigate(['/home/1'])
  }

  goHomepage(): void {
    this.router.navigate([`/home/${this.paramsService.GetPQuery.pageNumber}`]);
  }

  goError404(): void {
    this.router.navigate(['/error404'])
  }


}
