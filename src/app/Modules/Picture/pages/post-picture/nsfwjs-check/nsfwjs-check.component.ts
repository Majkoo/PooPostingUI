import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {PictureClassifiedModel} from "../../../../../Models/ApiModels/PictureClassifiedModel";

@Component({
  selector: 'app-nsfwjs-check',
  templateUrl: './nsfwjs-check.component.html',
  styleUrls: ['./nsfwjs-check.component.scss']
})
export class NsfwjsCheckComponent implements OnInit {
  @Output() onSubmit: EventEmitter<File> = new EventEmitter<File>();
  @Input() img: File | undefined;

  filePath: string = "";
  myForm: FormGroup;
  isNsfw: boolean | undefined;
  nsfwSummary: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService
  ) {
    this.myForm = this.formBuilder.group({
      img: [null]
    })
  }

  ngOnInit() {
    if (this.img) {
      console.log(this.img);
    }
  }

  imagePreview(e: any) {
    if ((e.target as HTMLInputElement).files![0]) {
      this.isNsfw = undefined;
      // @ts-ignore
      const file = (e.target as HTMLInputElement).files[0];
      this.myForm.patchValue({img: file});
      this.myForm.get('img')!.updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(file);

      let img = new FormData();
      img.append('file', file);
      this.img = img.get('file') as File;
      this.httpService.postClassifyPictureRequest(img)
        .subscribe((value: PictureClassifiedModel) => {
          this.isNsfw = value.isNsfw;
          if (value.isNsfw) this.nsfwSummary = value.predictedLabel;
        });
    }
  }

  submit() {
    if (this.img) {
      this.onSubmit.emit(this.img);
    }
  }

}
