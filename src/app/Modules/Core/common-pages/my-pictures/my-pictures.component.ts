import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {AccountModel} from "../../../../Models/ApiModels/AccountModel";

@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.component.html',
  styleUrls: ['./my-pictures.component.scss']
})
export class MyPicturesComponent implements OnInit {
  pictures!: PictureModel[];
  picturesCount!: number;
  @ViewChild('dv') dataView: any;

  constructor(
    private auth: AuthServiceService,
    private http: HttpServiceService,
    private configService: ConfigServiceService,
  ) { }

  ngOnInit(): void {
    this.http.getAccountRequest(this.auth.getUserInfo().accountDto.id)
      .subscribe({
        next: (value: AccountModel) => {
          this.auth.setUserAccountInfo(value);
          this.pictures = value.pictures;
          this.pictures = this.sortByDate(this.pictures);
          this.pictures.forEach(p => p.url.startsWith("http") ? null : p.url = (this.configService.picturesUrl + p.url));
          this.picturesCount = this.pictures.length;
        }
      });
  }

  filter($event: any) {
    //@ts-ignore
    this.dataView.filter($event.target.value!, 'contains')
  }

  private sortByDate(val: PictureModel[]): PictureModel[] {
    return val.sort((a, b) =>
      new Date(b.pictureAdded).getTime() - new Date(a.pictureAdded).getTime()
    );
  }
}
