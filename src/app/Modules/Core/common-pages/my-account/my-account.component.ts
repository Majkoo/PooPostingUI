import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";

@Component({
  selector: 'app-my-account',
  template: '',
  styles: ['']
})
export class MyAccountComponent implements OnInit {
  constructor(
    private sessionStorageService: SessionStorageServiceService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.navigate([`/account/${this.sessionStorageService.getSessionInfo()?.accountDto.id}`]);
    this.location.go('/home')
  }

}
