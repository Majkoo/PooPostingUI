import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {Picture} from "../../../../Models/Picture";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {HttpServiceService} from "../../../../Services/http/http-service.service";

@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.component.html',
  styleUrls: ['./my-pictures.component.scss']
})
export class MyPicturesComponent implements OnInit {
  pictures!: Picture[];

  constructor(
    private auth: AuthServiceService,
    private http: HttpServiceService,
    private configService: ConfigServiceService,
  ) { }

  ngOnInit(): void {

    this.http.getAccountRequest(this.auth.getUserInfo().accountDto.id)
      .subscribe({
        next: (value) => {
          this.auth.setUserAccountInfo(value);
          this.pictures = value.pictures;
          this.pictures.forEach(p => p.url.startsWith("http") ? null : p.url = this.configService.picturesUrl+p.url);
        }
      });

  }

}
