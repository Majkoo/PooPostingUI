import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-pic',
  templateUrl: './modal-pic.component.html',
  styleUrls: ['./modal-pic.component.scss']
})
export class ModalPicComponent {
  @Input() name!: string;
  @Input() url!: string;
  @Input() accountNickname!: string;
  @Input() tags!: string[];
}
