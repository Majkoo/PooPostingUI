import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-picture-settings',
  templateUrl: './picture-settings.component.html',
  styleUrls: ['./picture-settings.component.scss']
})
export class PictureSettingsComponent implements OnInit {
  @Input() picture!: Picture;
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      desc: new FormControl(null),
      tags: new FormControl(null)
    }, Validators.required);
  }

}
