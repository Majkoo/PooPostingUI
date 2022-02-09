import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { PicturePagedResult } from 'src/app/Models/PicturePagedResult';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  result: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems:0
  }

  constructor(
    private httpService: HttpServiceService,
    private params: HttpParamsServiceService,
    private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.params.setPageNumber(1);
    this.updateLikes();
    this.fetchPictures();
  }

  paginate(val: any) {
    this.updateLikes();
    this.params.setPageNumber(val.page+1);
    this.fetchPictures();
  }

  private fetchPictures(){
    this.httpService.getPicturesRequest().subscribe({
      next: (value: PicturePagedResult) => {
        this.result = value;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    });
  }

  private updateLikes(){
    if (this.auth.isUserLogged()){
      this.httpService.getAccountLikesRequest(this.auth.UserInfo?.accountDto.id)
        .subscribe({
          next: (value) => {
            this.auth.UserInfo!.likes = value;
          }
        });
    }
  }

}
