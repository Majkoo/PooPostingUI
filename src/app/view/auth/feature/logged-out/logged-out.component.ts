import { Component } from '@angular/core';
import {LocationServiceService} from "../../../../shared/helpers/location-service.service";

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss']
})
export class LoggedOutComponent {

  constructor(
    private locationService: LocationServiceService,
  ) {
  }

  back(): void {
    this.locationService.goBack();
  }

}
