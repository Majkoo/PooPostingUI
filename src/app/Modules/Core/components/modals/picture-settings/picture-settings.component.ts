import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {PutPictureModel} from "../../../../../Models/PutPictureModel";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-picture-settings',
  templateUrl: './picture-settings.component.html',
  styleUrls: ['./picture-settings.component.scss']
})
export class PictureSettingsComponent implements OnInit {
  @Input() picture!: Picture;
  form!: FormGroup;
  awaitSubmit: boolean = false;

  tags: string[] = [];
  constructor(
    private http: HttpServiceService,
    private message: MessageService,
  ) { }

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

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      desc: new FormControl("", [
        Validators.maxLength(500)
      ]),
      tags: new FormControl(this.tags)
    }, Validators.required);
    this.tags = this.picture.tags;
  }

  submit(){
    this.awaitSubmit = true;
    let model: PutPictureModel = {
      name: this.form.get('name')?.value ?? "",
      description: this.form.get('description')?.value ?? "",
      tags: this.tags
    }
    this.message.clear();
    this.http.putPictureRequest(model, this.picture.id).subscribe({
      next: (val) => {
        if (val) {
          this.picture.name = val.name;
          if (this.tags) this.picture.tags = val.tags;
          this.picture.description = val.description == "" || " " ? "brak opisu" : val.description;
          this.message.add({severity:'success', summary: 'Sukces', detail: 'Zmiany zostały wprowadzone'});
        }
        this.form.reset();
        this.awaitSubmit = false;
      }
    })
  }

}
