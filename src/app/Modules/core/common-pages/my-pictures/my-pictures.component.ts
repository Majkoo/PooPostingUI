import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../../../Services/data/auth-service.service";
import {Picture} from "../../../../Models/Picture";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {LikeModel} from "../../../../Models/LikeModel";

@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.component.html',
  styleUrls: ['./my-pictures.component.scss']
})
export class MyPicturesComponent implements OnInit {
  pictures!: Picture[];

  constructor(
    private auth: AuthServiceService,
    private configService: ConfigServiceService,
  ) { }

  ngOnInit(): void {
    let info = this.auth.getUserInfo();
    this.pictures = info.accountDto.pictures;
    this.pictures.forEach(p => p.url.startsWith("http") ? null : p.url = this.configService.picturesUrl+p.url);
  }

}
