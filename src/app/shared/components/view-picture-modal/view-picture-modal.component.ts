import {Component, inject, OnInit} from '@angular/core';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {firstValueFrom} from "rxjs";
import {PictureService} from "../../../services/data-access/picture/picture.service";

@Component({
  selector: 'pp-view-picture-modal',
  templateUrl: './view-picture-modal.component.html',
  styleUrls: ['./view-picture-modal.component.scss']
})
export class ViewPictureModalComponent implements OnInit {
  pic: PictureDto | undefined;

  private picService = inject(PictureService);

  async ngOnInit() {
    this.pic = await firstValueFrom(this.picService.getById("o8Nn6dP"));
  }
}
