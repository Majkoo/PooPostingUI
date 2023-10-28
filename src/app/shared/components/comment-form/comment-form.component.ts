import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {CommentDto} from "../../utility/dtos/CommentDto";
import {AuthService} from "../../../services/data-access/account/auth.service";
import {CommentService} from "../../../services/data-access/comment/comment.service";
import {FormsModule} from "@angular/forms";
import {debounceTime, Subject, switchMap} from "rxjs";

@Component({
  selector: 'pp-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent implements OnInit {
  @Input({required: true}) pic!: PictureDto;
  @Output() commentAdded: EventEmitter<CommentDto> = new EventEmitter<CommentDto>();

  commentText: string = '';
  private commentSubject = new Subject<string>();

  private authService = inject(AuthService);
  private commentService = inject(CommentService);

  get isLoggedOn() {
    return this.authService.isLoggedOn;
  }

  ngOnInit() {
    this.commentSubject.pipe(
      debounceTime(750),
      switchMap(commentText => this.handleCommentRequest(commentText))
    ).subscribe((addedComment: CommentDto) => {
      this.commentAdded.emit(addedComment);
      this.commentText = '';
    });
  }

  private handleCommentRequest(commentText: string) {
    return this.commentService.addComment(this.pic.id, { text: commentText } as CommentDto);
  }

  comment() {
    this.commentSubject.next(this.commentText);
  }

}

