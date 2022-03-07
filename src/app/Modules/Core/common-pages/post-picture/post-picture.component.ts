import {Component, OnInit, ViewChild} from '@angular/core';
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
  siteKey!: string;
  tags: string[] = [];
  any: any;

  captchaPassed: boolean = false;
  passCaptcha() {
    this.captchaPassed = true;
  }

  @ViewChild('cropperInput') CropperInput: any;
  @ViewChild('pChips') ChipsInput: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService,
    private message: MessageService,
    private router: Router
  ) {
    this.siteKey = "6Lfdv78eAAAAAJZcBW3ymM-3yaKieXyTTXFPNHcm";

    this.form  = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      img: new FormControl(undefined, [
        Validators.required
      ]),
      description: new FormControl("", [
        Validators.maxLength(500)
      ]),
      tags: new FormControl(this.tags, [
        Validators.maxLength(500)
      ]),
    });

  }

  // p-chips custom logic
  trimChips() {
    let tags: string[] = this.form.get('tags')?.value;
    let tagsToTrim: string[] = [];
    let tagsTrimmed: string[] = [];
    let uniqueTagsTrimmed: string[] = [];
    tags.forEach(val => {
      tagsToTrim = val.split(" ")
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
  onKeyDown(event: any) {
    if (event.key === ";" || event.key === " " || event.key === "," || event.key === "#") {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.blur();
      element.focus();
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
    return result.slice(0, result.length - 1);
  }

  //stackOverflow
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

  //send form data
  submit(){
    this.captchaPassed = false;
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
