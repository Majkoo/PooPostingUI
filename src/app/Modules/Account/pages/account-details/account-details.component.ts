import {Component, OnInit, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";
import {AllowModifyServiceService} from "../../../../Services/helpers/allow-modify-service.service";
import {SessionStorageServiceService} from "../../../../Services/data/session-storage-service.service";
import {MessageService} from "primeng/api";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  id: Observable<string>;
  account!: AccountModel;

  @ViewChild('dv') dataView: any;
  showAccountSettingsFlag: boolean = false;
  showAdminAccountSettingsFlag: boolean = false;
  isVisitorAccOwner: boolean =  false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private httpService: HttpServiceService,
    private configService: ConfigServiceService,
    private locationService: LocationServiceService,
    private allowModifyService: AllowModifyServiceService,
    private userDataService: UserDataServiceService,
    private title: Title
  ) {
    this.title.setTitle('PicturesUI');
    this.id = route.params.pipe(map(p => p['id']));
    this.id.subscribe({
      next: (val) => {
        if (val === "00000000-0000-0000-0000-000000000000") {
          this.locationService.goBack();
          this.messageService.add({
            severity: "warn",
            summary: "Przekiewowano cię z powrotem",
            detail: "Ten użytkownik jest zbanowany. Nie można przeglądać jego profilu."
          })
          return;
        }
        this.httpService.getAccountRequest(val)
          .subscribe(this.initialObserver);
      }
    })
  }

  filter($event: any) {
    //@ts-ignore
    this.dataView.filter($event.target.value!, 'contains')
  }
  showAccountSettings(): void {
    if (this.isVisitorAccOwner) {
      this.showAccountSettingsFlag = true;
    } else {
      this.showAdminAccountSettingsFlag = true;
    }
  }
  return(): void {
    this.locationService.goBack();
  }

  banAccount() {
    this.httpService.deleteAccountRequest(this.account.id)
      .subscribe({
        next: (val) => {
          if(val) {
            this.messageService.add({
              severity: "warn",
              summary: `Sukces`,
              detail: `Konto ${this.account.nickname} zostało zbanowane.`
            });
            this.locationService.goBack();
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: "error",
            summary: `Niepowodzenie`,
            detail: `Nie udało się zbanować konta ${this.account.nickname}. Sprawdź szczegóły w logach.`
          });
        }
      })
  }

  closeModals() {
    this.showAdminAccountSettingsFlag = false;
    this.showAccountSettingsFlag = false;
  }

  private initialObserver = {
    next: (acc: AccountModel) => {
      this.account = acc;
      this.fixPicUrls(this.account);
      this.sortByDate(this.account.pictures);
      this.isVisitorAccOwner = this.isVisitorAccOwnerCheck();
      this.allowModifyService.allowModifyAccount(acc);
      this.title.setTitle(`PicturesUI - Użytkownik ${acc.nickname}`);
    },
    error: () => {
      this.router.navigate(['/error404']);
    }
  }

  private isVisitorAccOwnerCheck(): boolean {
    if (!this.userDataService.isUserLoggedOn()) return false;
    return (this.account.id === this.userDataService.getUserInfo()!.accountDto.id);
  }
  private fixPicUrls(acc: AccountModel): void {
    acc.pictures.forEach(p =>
      !p.url.startsWith('http')
        ? p.url = `${this.configService.picturesUrl}${p.url}`
        : null);
  }
  private sortByDate(val: PictureModel[]): PictureModel[] {
    return val.sort((a, b) =>
      new Date(b.pictureAdded).getTime() - new Date(a.pictureAdded).getTime()
    );
  }
}
