import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ItemName} from "../../../../../Regexes/ItemName";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PostPictureServiceService} from "../../../../../Services/data/post-picture-service.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Output() onBack: EventEmitter<null> = new EventEmitter<null>();

  form!: UntypedFormGroup;
  tags: string[] = [];
  isName: RegExp = ItemName;
  isImgReady: boolean = false;

  siteKey!: string;
  captchaPassed: boolean = false;
  awaitSubmit: boolean = false;
  passCaptcha() {
    this.captchaPassed = true;
  }

  clearErrors(){
    this.awaitSubmit = false;
  }

  @ViewChild('cropperInput') CropperInput: any;
  @ViewChild('pChips') ChipsInput: any;

  constructor(
    private ppService: PostPictureServiceService,
    private formBuilder: UntypedFormBuilder,
    private httpService: HttpServiceService,
    private message: MessageService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle(`PicturesUI - Wstaw obrazek`);
    this.siteKey = "6Lfdv78eAAAAAJZcBW3ymM-3yaKieXyTTXFPNHcm";

    this.form  = this.formBuilder.group({
      name: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      description: new UntypedFormControl("", [
        Validators.maxLength(500)
      ]),
      tags: new UntypedFormControl(this.tags, [
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
          if (uniqueTagsTrimmed.length > 4){
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

  private tagsToString(tags: string[]): string{
    let result = ""
    tags.forEach(tag => result += (tag + " "));
    return result.slice(0, result.length - 1);
  }

  onCrop(bool: boolean) {
    this.isImgReady = bool;
  }

  //send form data
  submit(){
    this.awaitSubmit = true;
    let fData: FormData = new FormData;
    if (this.ppService.getCroppedImg()) {
      fData.append("file", this.ppService.getCroppedImg()!)
      fData.append("name", this.form.getRawValue().name)
      fData.append("description", this.form.getRawValue().description)
      fData.append("tags", this.tagsToString(this.tags))
    }
    this.message.clear();
    this.httpService.postPictureRequest(fData).subscribe({
      next: () => {
        this.router.navigate(["./home"]);
        this.message.add({severity:'success', summary: 'Sukces', detail: 'Obrazek został umieszczony na stronie'});
        this.clearErrors();
        this.ppService.garbageCollect();
      },
      error: () => {
        this.message.add({severity:'error', summary: 'Niepowodzenie', detail: 'Coś poszło nie tak. Przepraszamy za utrudnienia.'});
        this.awaitSubmit = false;
      }
    });
  }

  back() {
    this.onBack.emit();
  }

}
