import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-my-account',
  template: '',
  styles: ['']
})
export class MyAccountComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.navigate([`/account/${this.authService.getUserInfo().accountDto.id}`]);
    this.location.go('/home')
  }

}
