import {Component, Input, OnInit} from '@angular/core';
import {Picture} from "../../../../../Models/Picture";
import {AuthServiceService} from "../../../../../Services/data/auth-service.service";
import {HttpServiceService} from "../../../../../Services/http/http-service.service";
import {SelectOption} from "../../../../../Models/SelectOption";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent implements OnInit{
  @Input() picture!: Picture;
  @Input() isLoggedOn: boolean = false;

  selectOptions: SelectOption[];
  selectValue: SelectOption = { name: "Polubienia", class: "bi bi-hand-thumbs-up" };
  cols: any[];

  constructor(
    private auth: AuthServiceService,
    private httpService: HttpServiceService,
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
  }
  ngOnInit() {
    this.updatePicture();
  }

  like(){
    this.httpService.patchPictureLikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  dislike(){
    this.httpService.patchPictureDislikeRequest(this.picture.id)
      .subscribe(this.likeObserver)
  }
  updatePicture() {
    this.picture = this.auth.updatePictureLikes(this.picture);
    this.picture.likes.sort(l => l.isLike ? -1 : 0);
  }

  likeObserver = {
    next: () => {
      this.httpService.getPictureRequest(this.picture.id).subscribe({
        next: (value: Picture) => {
          this.picture.likes = value.likes;
          this.updatePicture();
        }
      })
    },
  }
}
