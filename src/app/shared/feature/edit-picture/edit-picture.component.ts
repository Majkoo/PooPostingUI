import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BlockSpaceOnStartEnd} from "../../utility/regexes/blockSpaceOnStartEnd";
import {MessageService} from "primeng/api";
import {PictureUpdateService} from "../../../data-access/picture/picture-update.service";
import {PictureService} from "../../../data-access/picture/picture.service";
import {PictureDto} from "../../utility/dtos/PictureDto";
import {SelectOption} from "../../utility/models/selectOption";
import {UpdatePictureTagsDto} from "../../utility/dtos/UpdatePictureTagsDto";
import {UpdatePictureNameDto} from "../../utility/dtos/UpdatePictureNameDto";
import {UpdatePictureDescriptionDto} from "../../utility/dtos/UpdatePictureDescriptionDto";

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.scss']
})
export class EditPictureComponent {

  @Input() pictureId = "";
  @Input() pictureName = "";
  @Input() isAdminModifiable = false;
  @Input() isModifiable = false;

  @Output() pictureChangedEvent: EventEmitter<PictureDto> = new EventEmitter<PictureDto>();
  @Output() pictureDeletedEvent: EventEmitter<null> = new EventEmitter<null>();

  deletePhrase = "";
  awaitSubmit = false;

  selectValue: SelectOption = {name: "none", class: "none"};
  editValue: SelectOption = {name: "none", class: "none"};
  editOptions: SelectOption[] = [
    { name: "Tagi", class: "bi bi-tag"},
    { name: "Nazwa", class: "bi bi-balloon"},
    { name: "Opis", class: "bi bi-file-earmark-text"},
  ]
  selectOptions: SelectOption[] = [
    { name: "Edytuj", class: "bi bi-pen"},
    { name: "Usuń", class: "bi bi-trash3"},
  ]
  tags: string[] = [];
  changeTags: FormGroup = new FormGroup({
    tags: new FormControl<string>("", [
      Validators.required
    ])
  });
  changeName: FormGroup = new FormGroup({
    name: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40),
      Validators.pattern(BlockSpaceOnStartEnd)
    ])
  });
  changeDesc: FormGroup = new FormGroup({
    desc: new FormControl<string>("", [
      Validators.required,
      Validators.maxLength(500),
    ])
  })

  constructor(
    private messageService: MessageService,
    private pictureUpdateService: PictureUpdateService,
    private pictureService: PictureService
  ) { }

  submitDelete() {
    this.awaitSubmit = true;
    this.pictureService
      .deletePicture(this.pictureId)
      .subscribe({
        next: () => {
          this.pictureDeletedEvent.emit();
          this.messageService.add({
            severity: 'warn',
            summary: 'Sukces',
            detail: 'Post został usunięty'
          });
          this.resetForms();
        },
        complete: () => {
          this.messageService.clear();
          this.awaitSubmit = false;
        }
      })
  }
  submitTags() {
    this.awaitSubmit = true;
    const data: UpdatePictureTagsDto = { tags: this.tags }
    this.pictureUpdateService
      .updatePictureTags(data, this.pictureId)
      .subscribe({
        next: (dto: PictureDto) => {
          this.pictureChangedEvent.emit(dto);
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Post został zaktualizowany'
          });
          this.resetForms();
        },
        complete: () => {
          this.messageService.clear();
          this.awaitSubmit = false;
        }
      })
  }
  submitName(){
    this.awaitSubmit = true;
    const data: UpdatePictureNameDto = { name: this.changeName.get('name')?.value }
    this.pictureUpdateService
      .updatePictureName(data, this.pictureId)
      .subscribe({
        next: (dto: PictureDto) => {
          this.pictureChangedEvent.emit(dto);
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Post został zaktualizowany'
          });
          this.resetForms();
        },
        complete: () => {
          this.messageService.clear();
          this.awaitSubmit = false;
        }
      })
  }
  submitDesc(){
    this.awaitSubmit = true;
    const data: UpdatePictureDescriptionDto = { description: this.changeDesc.get('desc')?.value }
    this.pictureUpdateService
      .updatePictureDescription(data, this.pictureId)
      .subscribe({
        next: (dto: PictureDto) => {
          this.pictureChangedEvent.emit(dto);
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Post został zaktualizowany'
          });
          this.resetForms();
        },
        complete: () => {
          this.messageService.clear();
          this.awaitSubmit = false;
        }
      })
  }

  // tags input utility fns
  trimChips() {
    const tags: string[] = this.changeTags.get('tags')?.value;
    let tagsToTrim: string[] = [];
    const tagsTrimmed: string[] = [];
    const uniqueTagsTrimmed: string[] = [];
    tags.forEach(val => {
      tagsToTrim = val.split(" ")
      tagsToTrim.forEach(tag => {
        tagsTrimmed.push(tag)
        tagsTrimmed.forEach((c) => {
          if (!uniqueTagsTrimmed.includes(c)) uniqueTagsTrimmed.push(c);
          if (uniqueTagsTrimmed.length > 4) uniqueTagsTrimmed.pop();
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


  private resetForms() {
    this.changeName.reset();
    this.changeDesc.reset();
    this.changeTags.reset();
    this.deletePhrase = "";
  }

}
