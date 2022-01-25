import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Picture} from "../../../../Interfaces/Picture";
import {HttpGetServiceService} from "../../../services/http-get-service.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  pictures!: Observable<Picture[]>;

  constructor(private httpGetService: HttpGetServiceService) {}

  ngOnInit(): void {
    this.pictures = this.httpGetService.getPictures();
  }


}
