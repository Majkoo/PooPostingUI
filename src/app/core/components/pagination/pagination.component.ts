import {Component, Input, OnInit} from '@angular/core';
import {HttpGetServiceService} from "../../services/http-get-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private httpGetService: HttpGetServiceService) { }

  @Input() page!: number;
  @Input() pagesArr: string[] = [];

  ngOnInit(): void {}

  goto(val: string){
    console.log("going to " + val)
  }
  previous(){
    console.log("previous")
  }
  next(){
    console.log("next")
  }

}
