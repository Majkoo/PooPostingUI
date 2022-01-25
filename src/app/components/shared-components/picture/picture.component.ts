import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../Interfaces/Picture";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  @Input() picture!: Picture | undefined;

  ngOnInit(): void {}

}
