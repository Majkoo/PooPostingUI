import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchServiceService} from "../../Core/services/search-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchPhrase?: string;
  form: FormGroup

  constructor(
    private searchService: SearchServiceService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      searchPhrase: new FormControl(null),
    });
  }
  onSubmit(){
    this.searchService.setSearchPhrase(this.form.getRawValue().searchPhrase);
    this.router.navigate(['/search']);
  }


}
