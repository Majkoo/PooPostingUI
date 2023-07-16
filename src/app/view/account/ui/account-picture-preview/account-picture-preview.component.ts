import {Component, inject, Input} from '@angular/core';
import {PictureDetailsServiceService} from "../../../../shared/state/picture-details-service.service";
import {PicturePreviewDto} from "../../../../shared/utility/dtos/PicturePreviewDto";

@Component({
  selector: 'app-account-picture-preview',
  templateUrl: './account-picture-preview.component.html',
  styleUrls: ['./account-picture-preview.component.scss']
})
export class AccountPicturePreviewComponent {

  @Input() picturePreview!: PicturePreviewDto;
  @Input() name!: string;

  private pictureDetailsService = inject(PictureDetailsServiceService);

  showPictureModal() {
    this.pictureDetailsService.modalTriggerSubject.next(this.picturePreview.id);
  }

}
