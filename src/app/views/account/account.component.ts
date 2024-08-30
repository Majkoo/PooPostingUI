import {ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, NavigationStart, Router, RouterLink, RoutesRecognized} from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
} from "rxjs";
import {AccountDto} from "../../shared/utility/dtos/AccountDto";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {UrlTransformModule} from "../../shared/utility/pipes/url-transform/url-transform.module";
import {combineLatest} from "rxjs";
import {map, tap} from "rxjs/operators";
import {PostPreviewComponent} from "./post-preview/post-preview.component";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AccountService} from "../../services/api/account/account.service";
import {AuthService} from "../../services/api/account/auth.service";
import * as _ from "lodash";
import { PictureDto } from 'src/app/shared/utility/dtos/PictureDto';
import { PictureService } from 'src/app/services/api/picture/picture.service';

@Component({
  selector: 'pp-account',
  standalone: true,
  imports: [CommonModule, UrlTransformModule, RouterLink, PostPreviewComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private pictureService = inject(PictureService);

  private pageSize = 4;
  private pageNumber = 1;
  private totalPages = 2;

  private enableScrollListener = true;
  private scrollSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private masterSub: Subscription = new Subscription();

  account$: Observable<AccountDto> = new Observable<AccountDto>();
  isAccountCurrentUsers = false;
  pictures : PictureDto[] = [];
  isPictueModalOpen = false;
  likesCount = 0
  commentsCount = 0
  currentId: string = ""

  constructor(private cdr: ChangeDetectorRef, router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if(this.isPictueModalOpen && router.url.split("=")[1] != undefined){
          let lastOpenedPictureId = router.url.split("=")[1]
          this.accountService.getById(router.url
            .split('/')[2].split("?")[0])
            .pipe(
              tap((acc: AccountDto) => {this.likesCount = acc.likeCount; this.commentsCount = acc.commentCount; this.cdr.detectChanges();})
            ).subscribe()
          
          this.pictureService.getById(lastOpenedPictureId)
            .pipe(
              tap((pic : PictureDto) => {
                let list : string[] = []
                this.pictures.forEach(x => {list.push(x.id)})
                this.pictures[list.indexOf(pic.id)].likeCount = pic.likeCount
                this.pictures[list.indexOf(pic.id)].commentCount = pic.commentCount
                this.pictures[list.indexOf(pic.id)].isLiked = pic.isLiked
                this.cdr.detectChanges();
              })
            ).subscribe()
        }
        this.isPictueModalOpen = !this.isPictueModalOpen
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = windowHeight * 0.75;

    if (
      documentHeight - scrollPosition - windowHeight < threshold && this.enableScrollListener
    ) {
      this.enableScrollListener = false;
      this.pageNumber += 1;
      if (this.pageNumber <= this.totalPages) {
        this.scrollSubject.next(null);
      }
    }
  }

  async ngOnInit() {
    if (this.router.url.split("=")[1] != undefined) {
      this.isPictueModalOpen = true
    }
    const id$: Observable<string> = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigateByUrl('..');
          return EMPTY;
        }
        return of(id);
      })
    );

    const initialAccount$ = id$.pipe(
      switchMap(id => this.getAccount(id)),
    );

    const picturesScroll$ = this.scrollSubject.pipe(
      switchMap(() => id$.pipe(
        switchMap(id => this.getPictures(id, this.pageSize, this.pageNumber))
      )),
      startWith(null)
    );

    this.account$ = combineLatest([initialAccount$, picturesScroll$]).pipe(
      map(([account, pictures]) => {
        if (account) {
          const acc = account as AccountDto;
          if(this.currentId == ""){
            this.currentId = acc.id
          }
          if(this.currentId != acc.id){
            this.pictures = []
            this.currentId = acc.id
          }
          if (pictures && pictures.items) {
            if (pictures.items[0].account.id == acc.id) {
              this.totalPages = pictures.totalPages
              this.pictures = this.pictures.concat(pictures.items);
              if (pictures?.totalPages != pictures?.page) {
                this.enableScrollListener = true;
              }
            }
          }
          this.isAccountCurrentUsers = acc.id == this.authService.getJwtData()?.uid;
          this.likesCount = acc.likeCount
          this.commentsCount = acc.commentCount
          return acc;
        }
        return null;
      }),
      filter((account): account is AccountDto => account !== null)
    );
  }

  logout() {
    this.authService.forgetTokens().subscribe();
  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  private getAccount(id: string) {
    return this.accountService.getById(id).pipe(
      catchError(async (err) => {
        await this.router.navigate(['..']);
        this.toastrService.error(err.error, defaultErrorHeading);
        return of(null);
      }))
  }

  private getPictures = (accId: string, pageSize: number, pageNumber: number) => {
    return this.accountService.getPicturesById(accId, pageSize, pageNumber);
  };

}
