import {Component, OnInit} from '@angular/core';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {firstValueFrom} from "rxjs";
import {PictureService} from "../../../services/data-access/picture/picture.service";
import {Location} from "@angular/common";
import {extractQueryParams} from "../../utility/extractQueryParams";
import {QueryModalService} from "../../../services/helpers/query-modal.service";

@Component({
  selector: 'pp-view-picture-modal',
  templateUrl: './view-picture-modal.component.html',
  styleUrls: ['./view-picture-modal.component.scss'],
})
export class ViewPictureModalComponent implements OnInit {
  pic: PictureDto | undefined;

  constructor(
    private picService: PictureService,
    private location: Location,
  ) {
  }

  async ngOnInit() {
    const queryParams = extractQueryParams(this.location.path());
    const picId = queryParams['viewPicture'];
    if (picId) {
      this.pic = await firstValueFrom(this.picService.getById(picId));
    }
  }

}
