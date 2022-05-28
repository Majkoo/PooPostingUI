import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {PictureClassifiedModel} from "../../../../../Models/ApiModels/PictureClassifiedModel";
import {PostPictureServiceService} from "../../../../../Services/data/post-picture-service.service";

@Component({
  selector: 'app-nsfwjs-check',
  templateUrl: './nsfwjs-check.component.html',
  styleUrls: ['./nsfwjs-check.component.scss']
})
export class NsfwjsCheckComponent implements OnInit {
  @Output() onSubmit: EventEmitter<null> = new EventEmitter<null>();

  filePath: string = "";
  myForm: FormGroup;
  isNsfw: boolean | undefined;

  constructor(
    private ppService: PostPictureServiceService,
    private formBuilder: FormBuilder,
    private httpService: HttpServiceService
  ) {
    this.myForm = this.formBuilder.group({
      img: [null]
    })
    this.ppService.getImg();
  }

  ngOnInit() {
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
      this.ppService.setImg(img.get('file') as File);

      this.httpService.postClassifyPictureRequest(img)
        .subscribe((value: PictureClassifiedModel) => {
          this.isNsfw = (value.adult >=4) || (value.violence >=4) || (value.racy === 5);
        });

    }
  }

  submit() {
    if (this.ppService.getImg()) {
      this.onSubmit.emit();
    }
  }

}
