import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";

@Component({
  selector: 'app-my-account',
  template: '',
  styles: ['']
})
export class MyAccountComponent implements OnInit {
  constructor(
    private userDataService: UserDataServiceService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.userDataService.isUserLoggedOn()) {
      this.router.navigate([`/account/${this.userDataService.getUserInfo()?.accountDto.id}`]);
      this.location.go('/home');
    } else {
      this.router.navigate(['/home']);
    }
  }

}
