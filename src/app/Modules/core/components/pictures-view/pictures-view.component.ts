import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../Models/Picture";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";

@Component({
  selector: 'app-pictures-view',
  templateUrl: './pictures-view.component.html',
  styleUrls: ['./pictures-view.component.scss']
})
export class PicturesViewComponent implements OnInit{
  @Input() picture!: Picture;
  showDetailsFlag: boolean = false;
  showSettingsFlag: boolean = false;

  constructor(
    private configService: ConfigServiceService,
  ) { }

  ngOnInit(): void {
    if(!this.picture.url.startsWith("http")){
      this.picture.url = this.configService.picturesUrl + this.picture.url;
    }
  }

  showDetails() {
    this.showDetailsFlag = true;
  }
  showSettings() {
    this.showSettingsFlag = true;
  }




}
