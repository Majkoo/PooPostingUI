import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchServiceService} from "../../Core/services/search-service.service";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../core/services/singletons/auth-service.service";

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
