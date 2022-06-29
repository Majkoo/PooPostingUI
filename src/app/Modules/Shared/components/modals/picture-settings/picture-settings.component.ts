import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PictureModel} from "../../../../../Models/ApiModels/Get/PictureModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {PutPictureModel} from "../../../../../Models/ApiModels/Post/PutPictureModel";
import {MessageService} from "primeng/api";
import {SelectOption} from "../../../../../Models/QueryModels/SelectOption";
import {ItemName} from "../../../../../Regexes/ItemName";

@Component({
  selector: 'app-picture-settings',
  templateUrl: './picture-settings.component.html',
  styleUrls: ['./picture-settings.component.scss']
})
export class PictureSettingsComponent implements OnInit {
  @Input() picture!: PictureModel;
  @Output() onDelete = new EventEmitter<void>();
  deletePhrase: string = "";
  isName: RegExp = ItemName;

  changeTags!: FormGroup;
  changeName!: FormGroup;
  changeDesc!: FormGroup;

  awaitSubmit: boolean = false;
  tags: string[] = [];

  editOptions: SelectOption[];
  editValue: SelectOption = {name: "none", class: "none"};

  selectOptions: SelectOption[];
  selectValue: SelectOption = {name: "none", class: "none"};

  constructor(
    private http: HttpServiceService,
    private message: MessageService,
  ) {
    this.editOptions = [
      { name: "Tagi", class: "bi bi-tag"},
      { name: "Nazwa", class: "bi bi-balloon"},
      { name: "Opis", class: "bi bi-file-earmark-text"},
    ]
    this.selectOptions = [
      { name: "Edytuj", class: "bi bi-pen"},
      { name: "Usuń", class: "bi bi-trash3"},
    ]
  }

  ngOnInit(): void {
    this.changeTags = new FormGroup({
      tags: new FormControl("", [
        Validators.required
      ])
    });
    this.changeName = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ])
    });
    this.changeDesc = new FormGroup({
      desc: new FormControl("", [
        Validators.required,
        Validators.maxLength(500)
      ])
    })
  }

  trimChips() {
    let tags: string[] = this.changeTags.get('tags')?.value;
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
    this.changeTags.get('tags')?.setValue(uniqueTagsTrimmed);
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



  submitTags(){
    this.awaitSubmit = true;
    let model: PutPictureModel = {
      tags: this.tags
    }
    this.putChanges(model);
    this.message.clear();
  }
  submitName(){
    this.awaitSubmit = true;
    let model: PutPictureModel = {
      name: this.changeName.get('name')?.value
    }
    this.putChanges(model);
    this.message.clear();
  }
  submitDesc(){
    this.awaitSubmit = true;
    let model: PutPictureModel = {
      description: this.changeDesc.get('desc')?.value
    }
    this.putChanges(model);
    this.message.clear();
  }
  delete() {
    this.onDelete.emit();
  }

  private resetForms() {
    this.changeTags.reset();
    this.changeName.reset();
    this.changeDesc.reset();
  }
  private putChanges(model: PutPictureModel) {
    this.http.putPictureRequest(model, this.picture.id).subscribe({
      next: (val) => {
        this.picture.name = val.name;
        if (this.tags) this.picture.tags = val.tags;
        this.picture.description = val.description;
        this.message.add({severity:'success', summary: 'Sukces', detail: 'Zmiany zostały wprowadzone'});
        this.resetForms();
        this.awaitSubmit = false;
      }
    })
  }

}
