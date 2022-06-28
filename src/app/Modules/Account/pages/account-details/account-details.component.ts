import {Component, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {AccountModel} from "../../../../Models/ApiModels/Get/AccountModel";
import {PictureModel} from "../../../../Models/ApiModels/Get/PictureModel";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";
import {MessageService} from "primeng/api";
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private httpService: HttpServiceService,
    private locationService: LocationServiceService,
    private title: Title
  ) {
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
      })
  }

  closeModals() {
    this.showAdminAccountSettingsFlag = false;
    this.showAccountSettingsFlag = false;
  }

  private initialObserver = {
    next: (acc: AccountModel) => {
      this.account = acc;
      this.sortByDate(this.account.pictures);
      this.title.setTitle(`PicturesUI - Użytkownik ${acc.nickname}`);
    },
    error: () => {
      this.router.navigate(['/error404']);
    }
  }

  private sortByDate(val: PictureModel[]): PictureModel[] {
    return val.sort((a, b) =>
      new Date(b.pictureAdded).getTime() - new Date(a.pictureAdded).getTime()
    );
  }
}
