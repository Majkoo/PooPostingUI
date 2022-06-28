import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PictureModel} from "../../../../../Models/ApiModels/Get/PictureModel";

@Component({
  selector: 'app-picture-admin-settings',
  templateUrl: './picture-admin-settings.component.html',
  styleUrls: ['./picture-admin-settings.component.scss']
})
export class PictureAdminSettingsComponent {
  @Input() picture!: PictureModel;
  @Output() onDelete = new EventEmitter<void>();
  deletePhrase: string = "";

  delete() {
    this.onDelete.emit();
  }
}
