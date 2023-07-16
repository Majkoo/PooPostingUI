import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {PictureDetailsServiceService} from "../../../../shared/state/picture-details-service.service";
import {LocationServiceService} from "../../../../shared/helpers/location-service.service";
import {AccountService} from "../../../../data-access/account/account.service";
import {AccountDto} from "../../../../shared/utility/dtos/AccountDto";
import {DtoPaged} from "../../../../shared/utility/dtos/DtoPaged";
import {PicturePreviewDto} from "../../../../shared/utility/dtos/PicturePreviewDto";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  pictureDetailsService: PictureDetailsServiceService = inject(PictureDetailsServiceService)
  locationService: LocationServiceService = inject(LocationServiceService)
  accountService: AccountService = inject(AccountService);
  messageService: MessageService = inject(MessageService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  account?: AccountDto;
  showInfo = false;
  showShare = false;
  picturePreviews?: DtoPaged<PicturePreviewDto>;

  private readonly subs: Subscription = new Subscription();

  ngOnInit(): void {

    const id: Observable<string> = this.route.params.pipe(map(p => p['id']));
    this.subs.add(
      id.subscribe(this.idObserver)
    );

    this.subs.add(
      this.pictureDetailsService
        .pictureDeletedSubject
        .subscribe(this.pictureDeletedObserver)
    );

  }

  updateAccount(account: AccountDto) {
    this.account = account;
  }

  banAccount() {
    this.subs.add(
      this.accountService
        .deleteAccount(this.account!.id)
        .subscribe(this.accountBannedObserver)
    );
  }

  return(): void {
    this.locationService.goBack();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private idObserver = {
    next: (id: string): void => {
      this.accountService.getAccountById(id)
        .subscribe(this.fetchAccountObserver);
    }
  }
  private fetchAccountObserver = {
    next: (acc: AccountDto) => {
      this.account = acc;
    },
    error: () => {
      this.locationService.goBack();
    }
  }
  private accountBannedObserver = {
    next: () => {
      this.messageService.add({
        severity: "warn",
        summary: `Sukces`,
        detail: `Konto ${this.account!.nickname} zostało zbanowane.`
      });
      this.locationService.goBack();
    },
  }
  private pictureDeletedObserver = {
    next: (val: string): void => {
      this.picturePreviews!.items = this.picturePreviews!.items.filter((p: PicturePreviewDto): boolean => p.id !== val);
    }
  }

}
