import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Picture} from "../../../Models/Picture";
import {Observable, switchMap} from "rxjs";
import {HttpGetServiceService} from "../../services/http-get-service.service";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit {
  constructor(
    private httpGetService: HttpGetServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  picture!: Observable<Picture>;

  ngOnInit(): void {
    this.picture = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.httpGetService.getPicture(params.get('id')!))
    )
  }

  goBack(){
    this.router.navigate(["/home"]);
  }

}
