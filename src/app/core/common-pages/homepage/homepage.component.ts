import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Picture} from "../../../Models/Picture";
import {map, Observable, tap} from "rxjs";
import {HttpGetServiceService} from "../../services/http-get-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  token: string | undefined;
  pictures!: Observable<Picture[]>;
  constructor(private httpGetService: HttpGetServiceService) {
  }

  ngOnInit(): void {
    this.pictures = this.httpGetService.getPictures();
  }

}
