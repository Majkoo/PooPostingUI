import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../../../../../Models/ApiModels/Get/CommentModel";

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.scss']
})
export class CommentTableComponent implements OnInit {
  @Input() comments!: CommentModel[];
  @Output() onDelete: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();
  constructor() { }

  ngOnInit(): void {
    this.comments.sort((a, b) => {
      return new Date(b.commentAdded).getTime() - new Date(a.commentAdded).getTime()
    });
  }

  delete(comment: CommentModel) {
    this.onDelete.emit(comment);
  }

}
