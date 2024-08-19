import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pp-switch-btn',
  templateUrl: './switch-btn.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SwitchBtnComponent {
  @Input() flipped: boolean = false;
  @Output() flip: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(){
    console.log("switch", this.flipped);
  }
}
