import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../services/data-access/account/auth.service";
import {Observable, tap} from "rxjs";
import {AccountDto} from "../../shared/utility/dtos/AccountDto";
import {AccountService} from "../../services/data-access/account/account.service";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {RouterLink} from "@angular/router";
import {PostPreviewComponent} from "../account/post-preview/post-preview.component";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";
import {PictureService} from "../../services/data-access/picture/picture.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'pp-liked',
  standalone: true,
  imports: [CommonModule, RouterLink, PostPreviewComponent],
  templateUrl: './liked.component.html',
  styles: [
  ],
  animations: [fadeInAnimation]
})
export class LikedComponent {
  private accountService = inject(AccountService);
  private pictureService = inject(PictureService);
  private authService = inject(AuthService);
  account$: Observable<AccountDto>;
  pics$: Observable<PictureDto[]>;
  totalLikedPictures?: number;

  constructor() {
    this.account$ = this.accountService.getMe();

    this.pics$ = this.pictureService.getLiked(6, 1, this.authService.getJwtData()!.uid)
      .pipe(
        tap((res) => {
          this.totalLikedPictures = res.totalItems;
        }),
        map((res) => res.items)
      );
  }

}
