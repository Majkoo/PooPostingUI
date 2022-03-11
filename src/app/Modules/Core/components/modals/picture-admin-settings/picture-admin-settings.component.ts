import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";

@Component({
  selector: 'app-picture-admin-settings',
  templateUrl: './picture-admin-settings.component.html',
  styleUrls: ['./picture-admin-settings.component.scss']
})
export class PictureAdminSettingsComponent {
  @Input() picture!: Picture;
  @Output() onDelete = new EventEmitter<void>();
  deletePhrase: string = "";

  delete() {
    this.onDelete.emit();
  }
}
