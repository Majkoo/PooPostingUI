import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {
  @Input() description!: string;
  @Input() accountNickname!: string;
  @Input() pictureAdded!: string;

  isWhitespace(input: string): boolean {
    if(!input) return false;
    return !(input.trim().length === 0);
  }
}
