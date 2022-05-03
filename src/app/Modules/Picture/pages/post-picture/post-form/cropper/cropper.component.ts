import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {PostPictureServiceService} from "../../../../../../Services/data/post-picture-service.service";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent {
  imageChangedEvent: any;
  croppedImage: any;
  file!: File;

  @Output() onCrop: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private ppService: PostPictureServiceService,
  ) {
    this.file = ppService.getImg()!;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    const Blob =  this.dataURItoBlob(event.base64!);
    let file = new File([Blob], "picture");
    this.ppService.setCroppedImg(file);
    this.onCrop.emit(true);
  }
  imageLoaded() {
  }
  cropperReady() {
  }
  loadImageFailed() {
    this.onCrop.emit(false);
  }

  private dataURItoBlob(dataURI: string) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }

}
