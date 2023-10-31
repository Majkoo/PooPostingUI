import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AccountService} from "../../services/data-access/account/account.service";
import {BehaviorSubject, catchError, Observable, of, startWith, Subscription, switchMap, tap} from "rxjs";
import {AccountDto} from "../../shared/utility/dtos/AccountDto";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {UrlTransformModule} from "../../shared/utility/pipes/url-transform/url-transform.module";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'pp-account',
  standalone: true,
  imports: [CommonModule, UrlTransformModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private accountService = inject(AccountService);

  private pageSize = 4;
  private pageNumber = 2;

  private initialPicturesFetched = false;
  private enableScrollListener = true;
  private scrollSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private masterSub: Subscription = new Subscription();

  account$: Observable<AccountDto> = new Observable<AccountDto>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = 200;

    if (
      documentHeight - scrollPosition - windowHeight < threshold && this.enableScrollListener
    ) {
      this.enableScrollListener = false;
      this.scrollSubject.next(null);
    }
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // todo: use this as declarative stream
    if (!id) {
      await this.router.navigate([".."]);
      return;
    }

    const initialAccount$ = this.getAccount(id) as Observable<AccountDto>;
    const picturesScroll$ = this.scrollSubject.pipe(
      switchMap(() => this.getPictures(id, this.pageSize, this.pageNumber))
    ).pipe(
      startWith(null)
    );

    this.account$ = combineLatest([
      initialAccount$,
      picturesScroll$
    ]).pipe(
      map(([
        account,
        pictures
        ]) => {
        const result = account;
        result.pictures = [...result.pictures, ...(pictures?.items || [])]
        return result;
      })
    )

  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  afterAccountInit(accId: string, picCountFromServer: number, alreadyFetchedCount: number) {
    const defaultFetchesCount = 5;
    const remainingPictures = picCountFromServer - alreadyFetchedCount;
    const totalFetchesRequired = Math.ceil(remainingPictures / this.pageSize);

    const fetchesCount = Math.min(totalFetchesRequired, defaultFetchesCount);
    console.log(fetchesCount);

    for (let i = 0; i < fetchesCount; i++) {
      this.getPictures(accId, this.pageSize, this.pageNumber + i).subscribe();
    }
  }

  private getAccount(id: string) {
    return this.accountService.getById(id).pipe(
      catchError(async (err: HttpErrorResponse) => {
        await this.router.navigate(['error-route']);
        this.toastrService.error(err.error, defaultErrorHeading);
        return of(null);
      }))
      .pipe(tap((res) => {
        if (!this.initialPicturesFetched) {
          const acc = res as AccountDto;
          this.afterAccountInit(acc?.id, acc.pictureCount || 0, acc.pictures?.length || 0)
        }
      }));
  }

  private getPictures = (accId: string, pageSize: number, pageNumber: number) => {
    return this.accountService.getPicturesById(accId, pageSize, pageNumber);
  };

}
