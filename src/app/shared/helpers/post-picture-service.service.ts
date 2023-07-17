import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostPictureServiceService {

  constructor(
  ) {
  }

  cropperDataUrl = "";
  file?: Blob;
  name?: string;
  description?: string;
  tags?: string[];
}
