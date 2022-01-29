import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {HttpPostServiceService} from "../../services/http-post-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-picture',
  templateUrl: './post-picture.component.html',
  styleUrls: ['./post-picture.component.scss']
})
export class PostPictureComponent {
  form!: FormGroup;
  image!: File;
  //add more specific validation in future
  NameFormControl = new FormControl('', [Validators.required]);


  constructor(
    private formBuilder: FormBuilder,
    private httpPost: HttpPostServiceService,
    private router: Router) {
    this.form  = this.formBuilder.group({
      name: '',
      img: undefined,
      description: '',
      tags: this.tags
    })
  }

  // mat-chips
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags: string[] = [];
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  // image cropper
  imageChangedEvent: any;
  croppedImage: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    const Blob =  this.dataURItoBlob(event.base64!);
    let file = new File([Blob], "picture")
    this.image = file;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  private tagsToString(tags: string[]): string{
    let result = ""
    tags.forEach(tag => result += (tag + " "));
    return result
  }

  //stackOverflow
  dataURItoBlob(dataURI: string) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }

  //send form data
  submit(){
    let fData: FormData = new FormData;
    fData.append("file", this.image)
    fData.append("name", this.form.getRawValue().name)
    fData.append("description", this.form.getRawValue().description)
    fData.append("tags", this.tagsToString(this.tags))

    this.httpPost.postPicture(fData).subscribe({
      next: (value) => {this.router.navigate(["./home"])},
      error: (err) => console.error(err)
    });
  }

}
