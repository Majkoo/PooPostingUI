import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pp-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
  standalone: true
})
export class TextButtonComponent {
  @Input({ required: true }) buttonText!: string;
  @Output() onClick = new EventEmitter();
}
