import { Component, OnInit } from '@angular/core';
import {ConfigServiceService} from "../../../Services/data/config-service.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit {
  appUrl: string;
  serviceAdmin: string;
  serviceAdminEmail: string;
  hostingProvider: string;
  constructor(
    private config: ConfigServiceService,
    private title: Title
  ) {
    this.title.setTitle(`PicturesUI - Polityka prywatności`);
    this.appUrl = config.appUrl;
    this.serviceAdmin = config.serviceAdmin;
    this.serviceAdminEmail = config.serviceAdminEmail;
    this.hostingProvider = config.hostingProvider;
  }

  ngOnInit(): void {
  }

}
