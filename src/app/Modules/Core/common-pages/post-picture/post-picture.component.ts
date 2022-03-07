import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {Router} from "@angular/router";
import { HttpServiceService } from 'src/app/Services/http/http-service.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-post-picture',
  templateUrl: './post-picture.component.html',
  styleUrls: ['./post-picture.component.scss']
})
export class PostPictureComponent {
  form!: FormGroup;
  image!: File;
  tags: string[] = [];
  any: any;

  @ViewChild('cropperInput') CropperInput: any;
  @ViewChild('pChips') ChipsInput: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService,
    private message: MessageService,
    private router: Router
  ) {
    this.form  = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      img: undefined,
      description: new FormControl("", [
        Validators.maxLength(500),
      ]),
      tags: new FormControl(this.tags, [
        Validators.maxLength(500), // add custom max 500 chars validator
      ]),
    })
  }

  // p-chips custom logic
  trimChips() {
    console.log(this.form.get('tags')?.value);
    let tags: string[] = this.form.get('tags')?.value;
    let tagsToTrim: string[] = [];
    let tagsTrimmed: string[] = [];
    let uniqueTagsTrimmed: string[] = [];
    tags.forEach(val => {
      tagsToTrim = val.split(' ')
      tagsToTrim.forEach(tag => {
        tagsTrimmed.push(tag)
        tagsTrimmed.forEach((c) => {
          if (!uniqueTagsTrimmed.includes(c)) {
            uniqueTagsTrimmed.push(c);
          }
          if (uniqueTagsTrimmed.length > 6){
            uniqueTagsTrimmed.pop();
          }
        });
      });
    });
    this.form.get('tags')?.setValue(uniqueTagsTrimmed);
    this.tags = uniqueTagsTrimmed;
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

  // changeRatio(value: number){
  //   this.CropperInput.aspectRatio = value;
  // }

  //send form data
  submit(){
    let fData: FormData = new FormData;
    fData.append("file", this.image)
    fData.append("name", this.form.getRawValue().name)
    fData.append("description", this.form.getRawValue().description)
    fData.append("tags", this.tagsToString(this.tags))
    this.message.clear();
    this.httpService.postPictureRequest(fData).subscribe({
      next: () => {
        this.router.navigate(["./home"]);
        this.message.add({severity:'success', summary: 'Sukces', detail: 'Obrazek został umieszczony na stronie'});
      },
      error: (err) => {
        this.message.add({severity:'error', summary: 'Niepowodzenie', detail: 'Nie udało się zapostować obrazka. Sprawdź błędy.'});
        console.error(err)
      }
    });
  }

}
