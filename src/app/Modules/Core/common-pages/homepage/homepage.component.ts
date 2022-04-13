import {Component, OnInit, ViewChild,} from '@angular/core';
import { PicturePagedResult } from 'src/app/Models/ApiModels/PicturePagedResult';
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import { HttpParamsServiceService } from 'src/app/Services/http/http-params-service.service';
import {LikeModel} from "../../../../Models/ApiModels/LikeModel";
import {ScrollServiceService} from "../../../../Services/helpers/scroll-service.service";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";

@Component({
  selector: 'app-body',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @ViewChild('customPaginator') paginator: any;
  result: PicturePagedResult = {
    items:[],
    page:0,
    pageSize: 0,
    totalItems: 0
  }
  pageObservable: Observable<number> = new Observable<number>();

  constructor(
    private httpService: HttpServiceService,
    private userDataService: UserDataServiceService,
    private paramsService: HttpParamsServiceService,
    private scrollService: ScrollServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageObservable = this.route.params.pipe(map(p => p['pageNumber']));
    this.pageObservable.subscribe({
      next: (val) => {
        this.paramsService.homePageSubject.next(val);
      }
    })
    this.paramsService.homePageSubject.subscribe({
      next: () => {
        this.updateLikes();
        this.fetchPictures();
      }
    })
  }
  paginate(val: any): void {
    this.router.navigate([`home/page/${val+1}`])
  }
  scroll(top: number) {
    this.scrollService.scroll(top);
  }

  private fetchPictures(): void {
    this.result.items = [];
    this.scrollService.scroll(0);
    this.httpService.getPicturesRequest().subscribe({
      next: (value: PicturePagedResult) => {
        this.result = value;
        this.paginator.updateCurrentPage(this.paramsService.getPageNumber());
        this.paginator.updatePages(value.totalItems);
      },
      error: () => {
        if (this.result.page === 0) {
          this.router.navigate(['/home/page/1']);
        }
      }
    });
  }
  private updateLikes(): void {
    if (this.userDataService.isUserLoggedOn()){
      this.httpService.getAccountLikesRequest(this.userDataService.getUserInfo()?.accountDto.id)
        .subscribe({
          next: (value: LikeModel[]) => {
            this.userDataService.UserInfo!.likes = value;
          }
        });
    }
  }

}

