import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Picture} from "../../../Models/Picture";
import {Observable, switchMap} from "rxjs";
import {HttpGetServiceService} from "../../services/http-get-service.service";
import {ConfigServiceService} from "../../services/singletons/config-service.service";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit {
  constructor(
    private httpGetService: HttpGetServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigServiceService) { }

  picture!: Observable<Picture>;
  pictureBaseUrl!: string;

  ngOnInit(): void {
    this.picture = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.httpGetService.getPicture(params.get('id')!))
    )
    this.pictureBaseUrl = this.configService.picturesUrl;
  }

  goBack(){
    this.router.navigate(["/home"]);
  }

}
