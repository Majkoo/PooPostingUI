import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AccountService} from "../../services/data-access/account/account.service";
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter, firstValueFrom,
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
import {map} from "rxjs/operators";
import {PostPreviewComponent} from "./post-preview/post-preview.component";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AuthService} from "../../services/data-access/account/auth.service";

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

  private pageSize = 4;
  private pageNumber = 2;

  private enableScrollListener = true;
  private scrollSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private masterSub: Subscription = new Subscription();

  account$: Observable<AccountDto> = new Observable<AccountDto>();
  isAccountCurrentUsers = false;

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
          const updatedPictures = acc.pictures || [];
          if (pictures && pictures.items) {
            updatedPictures.push(...pictures.items);
          }
          this.isAccountCurrentUsers = acc.id == this.authService.getJwtData()?.uid;
          return { ...acc, pictures: updatedPictures };
        }
        return null;
      }),
      filter((account): account is AccountDto => account !== null)
    );

  }

  async logout() {
    await firstValueFrom(this.authService.forgetTokens());
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
