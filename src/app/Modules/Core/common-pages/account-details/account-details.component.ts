import {Component, OnInit, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {Location} from "@angular/common";
import {AuthServiceService} from "../../../../Services/data/auth-service.service";

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
  isVisitorAdmin: boolean = false;
  isVisitorAccOwner: boolean =  false;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private httpService: HttpServiceService,
    private authService: AuthServiceService,
    private configService: ConfigServiceService,
  ) {
    this.id = route.params.pipe(map(p => p['id']));
    this.id.subscribe({
      next: (val) => {
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
    this.showAccountSettingsFlag = true;
  }
  return(): void {
    this.location.back();
  }

  private initialObserver = {
    next: (acc: AccountModel) => {
      this.account = acc;
      this.fixPicUrls(this.account);
      this.sortByDate(this.account.pictures);
      this.isVisitorAccOwner = (this.account.id === this.authService.getUserInfo().accountDto.id);
    },
    error: () => {
      this.router.navigate(['/error404']);
    }
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
