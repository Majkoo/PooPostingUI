import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemName} from "../../../../../Regexes/ItemName";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Output() onBack: EventEmitter<File> = new EventEmitter<File>();
  @Input() img: File | undefined;

  form!: FormGroup;
  image!: File;
  tags: string[] = [];
  isName: RegExp = ItemName;


  siteKey!: string;
  captchaPassed: boolean = false;
  awaitSubmit: boolean = false;
  imgError: boolean = false;
  isSafe: boolean = true;
  passCaptcha() {
    this.captchaPassed = true;
  }

  clearErrors(){
    this.awaitSubmit = false;
    this.imgError = false;
    this.isSafe = true;
  }

  @ViewChild('cropperInput') CropperInput: any;
  @ViewChild('pChips') ChipsInput: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService,
    private message: MessageService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle(`PicturesUI - Wstaw obrazek`);
    this.siteKey = "6Lfdv78eAAAAAJZcBW3ymM-3yaKieXyTTXFPNHcm";

    this.form  = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
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
  popChips() {
    this.tags.pop();
  }
  onKeyDown(event: any) {
    if (event.key === " ") {
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
    this.clearErrors();
  }
  imageCropped(event: ImageCroppedEvent) {
    const Blob =  this.dataURItoBlob(event.base64!);
    let file = new File([Blob], "picture")
    this.image = file;
    this.clearErrors();
  }
  imageLoaded() {
    this.clearErrors();
  }
  cropperReady() {
    this.clearErrors();
  }
  loadImageFailed() {
    this.clearErrors();
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
    this.awaitSubmit = true;
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
        this.clearErrors();
      },
      error: (err) => {
        switch (err.error) {
          case ("nsfw picture"):
            this.message.add({severity:'error', summary: 'Niepowodzenie', detail: 'Wykryto nieodpowiednie treści. Obrazek nie został zapostowany.'});
            this.isSafe = false;
            break;
        }
        this.awaitSubmit = false;
      }
    });
  }

  back() {
    this.onBack.emit(this.img);
  }


}
