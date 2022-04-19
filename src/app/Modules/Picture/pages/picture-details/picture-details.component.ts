import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PictureModel} from "../../../../Models/ApiModels/PictureModel";
import {SelectOption} from "../../../../Models/SelectOption";
import {ConfigServiceService} from "../../../../Services/data/config-service.service";
import {HttpServiceService} from "../../../../Services/http/http-service.service";
import {CommentModel} from "../../../../Models/ApiModels/CommentModel";
import {LocationServiceService} from "../../../../Services/helpers/location-service.service";
import {AllowModifyServiceService} from "../../../../Services/helpers/allow-modify-service.service";
import {UserDataServiceService} from "../../../../Services/data/user-data-service.service";
import {ItemName} from "../../../../Regexes/ItemName";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent {
  picture!: PictureModel;
  id: Observable<string>;
  isLoggedOn: boolean = false;

  commentForm: FormGroup = new FormGroup({
    text: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(250)
    ])
  })
  awaitSubmit: boolean = false;

  cols: any[] = [
    { field: 'index', header: 'Numer'},
    { field: 'account', header: 'Użytkownik' },
    { field: 'like', header: 'Polubienie' },
  ];
  selectOptions: SelectOption[] = [
    { name: "Polubienia", class: "bi bi-hand-thumbs-up"},
    { name: "Komentarze", class: "bi bi-chat-right-text"},
  ];
  selectValue: SelectOption = {
    name: "Komentarze", class: "bi bi-chat-right-text"
  };

  showSettingsFlag: boolean = false;
  showAdminSettingsFlag: boolean = false;
  showShareFlag: boolean = false;
  isValidComment: RegExp = ItemName;

  constructor(
    private userDataService: UserDataServiceService,
    private locationService: LocationServiceService,
    private configService: ConfigServiceService,
    private httpService: HttpServiceService,
    private messageService: MessageService,
    private allowModifyService: AllowModifyServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('PicturesUI');
    this.isLoggedOn = userDataService.isUserLoggedOn();
    this.id = route.params.pipe(map(p => p['id']));
    this.initialSubscribe();
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
  updatePicture() {
    this.picture = this.userDataService.updatePictureLikes(this.picture);
    this.picture.likes.sort(l => l.isLike ? -1 : 0);
    this.allowModifyService.allowModifyPicture(this.picture);
    this.picture.tags = this.picture.tags.filter(t => t != '');
  }
  deleteComment($event: CommentModel) {
    this.httpService.deleteCommentRequest(this.picture.id, $event.id)
      .subscribe({
        next: () => {
          this.picture.comments = this.picture.comments.filter(c => c.id !== $event.id);
          this.messageService.add({
            severity:'warn',
            summary:'Sukces',
            detail:'Pomyślnie usunięto komentarz!',
          });
        },
        error: () => {
          this.messageService.add({
            severity:'error',
            summary: 'Niepowodzenie',
            detail: `Nie udało się usunąć komentarza.`
          });
        }
      })
  }
  deletePicture() {
    this.httpService.deletePictureRequest(this.picture.id).subscribe({
      next: () => {
        this.messageService.add({
          severity:'warn',
          summary: 'Sukces',
          detail: `Obrazek "${this.picture.name}" został usunięty. Zobaczysz efekty po przeładowaniu wyników.`
        });
      },
      error: () => {
        this.messageService.add({
          severity:'error',
          summary: 'Niepowodzenie',
          detail: `Nie udało się usunąć obrazka "${this.picture.name}".`
        });
      }
    })
    this.showSettingsFlag = false;
    this.showAdminSettingsFlag = false;
  }

  showSettings() {
    if(this.picture.accountId === this.userDataService.getUserInfo()?.accountDto.id) {
      this.showSettingsFlag = true;
    } else {
      this.showAdminSettingsFlag = true;
    }
  }
  showShare() {
    this.showShareFlag = true;
  }
  return() {
    this.locationService.goBack();
  }

  initialSubscribe() {
    this.id.subscribe({
      next: (val) => {
        this.httpService.getPictureRequest(val).subscribe({
          next: (pic: PictureModel) => {
            this.picture = pic;
            this.updatePicture();
            if(!this.picture.url.startsWith("http")){
              this.picture.url = this.configService.picturesUrl + this.picture.url;
            }
            this.title.setTitle(`PicturesUI - Obrazek ${pic.name}`);
          },
          error: () => {
            this.router.navigate(['/error404']);
          }
        });
      }
    })
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
    error: () => {
      this.messageService.add({
        severity:'error',
        summary: 'Niepowodzenie',
        detail: `Coś poszło nie tak.`
      });
    }
  }
  commentObserver = {
    next: (val: CommentModel) => {
      this.picture.comments.unshift(val);
      this.commentForm.reset();
      this.awaitSubmit = false;
      this.messageService.add({
        severity:'success',
        summary:'Sukces',
        detail:'Pomyślnie skomentowano!'
      });
    },
    error: () => {
      this.messageService.add({
        severity:'error',
        summary: 'Niepowodzenie',
        detail: `Coś poszło nie tak.`
      });
    }
  }
}
