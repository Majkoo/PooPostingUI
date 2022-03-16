import {Component, Input, OnInit} from '@angular/core';
import {PictureModel} from "../../../../../Models/ApiModels/PictureModel";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {SelectOption} from "../../../../../Models/SelectOption";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../../../Models/ApiModels/CommentModel";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit{
  @Input() picture!: PictureModel;
  @Input() isLoggedOn: boolean = false;

  commentForm: FormGroup;
  awaitSubmit: boolean = false;
  selectOptions: SelectOption[];
  selectValue: SelectOption = { name: "Komentarze", class: "bi bi-chat-right-text"};
  cols: any[];

  constructor(
    private auth: AuthServiceService,
    private httpService: HttpServiceService,
    private message: MessageService
  ) {
    this.selectOptions = [
      { name: "Polubienia", class: "bi bi-hand-thumbs-up"},
      { name: "Komentarze", class: "bi bi-chat-right-text"},
    ]
    this.cols = [
      { field: 'index', header: 'Numer'},
      { field: 'account', header: 'Użytkownik' },
      { field: 'like', header: 'Polubienie' },
    ];
    this.commentForm = new FormGroup({
      text: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(250)
      ])
    })
  }
  ngOnInit() {
    this.updatePicture();
  }
  like() {
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  dislike(){
    this.httpService.patchPictureDislikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  comment() {
    this.awaitSubmit = true;
    this.httpService.postCommentRequest(this.picture.id, this.commentForm.getRawValue())
      .subscribe(this.commentObserver);
  }
  deleteComment($event: CommentModel) {
    this.httpService.deleteCommentRequest(this.picture.id, $event.id)
      .subscribe({
        next: () => {
          this.picture.comments = this.picture.comments.filter(c => c.id !== $event.id);
          this.message.add({
            severity:'warn',
            summary:'Sukces',
            detail:'Pomyślnie usunięto komentarz!'
          });
        }
      })
  }
  updatePicture() {
    this.picture = this.auth.updatePictureLikes(this.picture);
    this.picture.likes.sort(l => l.isLike ? -1 : 0);
  }

  likeObserver = {
    next: () => {
      this.httpService.getPictureRequest(this.picture.id).subscribe({
        next: (value: PictureModel) => {
          this.picture.likes = value.likes;
          this.updatePicture();
        }
      })
    },
  }
  commentObserver = {
    next: (val: CommentModel) => {
      this.picture.comments.unshift(val);
      this.commentForm.reset();
      this.awaitSubmit = false;
      this.message.add({
        severity:'success',
        summary:'Sukces',
        detail:'Pomyślnie skomentowano!'
      });
    }
  }
}
