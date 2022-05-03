import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostPictureServiceService {

  constructor() { }

  img: File | undefined;
  croppedImg: Blob | undefined;

  getImg(): File | undefined {
    return this.img
  }
  setImg(file: File) {
    this.img = file;
  }

  getCroppedImg(): Blob | undefined {
    return this.croppedImg
  }
  setCroppedImg(blob: Blob) {
    this.croppedImg = blob;
  }

  garbageCollect() {
    this.img = undefined;
    this.croppedImg = undefined;
  }

}
