import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpServiceService} from "../../services/http/http-service.service";
import {HttpParamsServiceService} from "../../services/http/http-params-service.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @ViewChild('paginatorTop') paginator: any;
  form!: FormGroup;

  constructor(
    private httpService: HttpServiceService,
    private params: HttpParamsServiceService,
    private router: Router
  ) {
    this.form = new FormGroup({
      lookFor: new FormControl('pictures'),
      sortBy: new FormControl('mostPopular'),
      searchPhrase: new FormControl(null)
    })
  }

  pageTop(val: any) {
    this.params.setPageNumber(val.pageIndex+1);
  }

  onSubmit(){
    console.log(this.form.getRawValue())
  }

  ngOnInit(): void {
  }

}
