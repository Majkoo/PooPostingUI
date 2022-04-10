import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rulebook',
  templateUrl: './rulebook.component.html',
  styleUrls: ['./rulebook.component.scss']
})
export class RulebookComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toTos(){
    this.router.navigate(['/tos']);
  }

}
