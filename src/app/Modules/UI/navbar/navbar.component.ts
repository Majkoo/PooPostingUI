import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AuthServiceService } from 'src/app/Services/data/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private auth: AuthServiceService,
    private router: Router,
  ) {

  }



}
