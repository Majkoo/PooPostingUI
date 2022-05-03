import {Component} from '@angular/core';

@Component({
  selector: 'app-post-picture',
  templateUrl: './post-picture.component.html',
  styleUrls: ['./post-picture.component.scss']
})
export class PostPictureComponent {
  img: File | undefined;
  currentStep: number = 1;

  goto(val: number, file: File) {
    this.updateImg(file);
    this.currentStep = val;
  }

  private updateImg(file: File) {
    this.img = file
  }
}
