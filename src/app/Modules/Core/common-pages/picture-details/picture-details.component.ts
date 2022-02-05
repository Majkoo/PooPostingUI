import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import { Picture } from 'src/app/Models/Picture';
import { ConfigServiceService } from 'src/app/Services/data/config-service.service';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigServiceService) { }

  picture!: Observable<Picture>;
  pictureBaseUrl!: string;

  ngOnInit(): void {
    this.picture = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.httpService.getPictureRequest(params.get('id')!))
    )
    this.pictureBaseUrl = this.configService.picturesUrl;
  }

  goBack(){
    this.router.navigate(["/home"]);
  }

}
