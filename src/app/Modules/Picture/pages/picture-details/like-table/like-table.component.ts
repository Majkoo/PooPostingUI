import {Component, Input, OnInit} from '@angular/core';
import {LikeModel} from "../../../../../Models/ApiModels/Get/LikeModel";

@Component({
  selector: 'app-like-table',
  templateUrl: './like-table.component.html',
  styleUrls: ['./like-table.component.scss']
})
export class LikeTableComponent implements OnInit {
  @Input() likes!: LikeModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
