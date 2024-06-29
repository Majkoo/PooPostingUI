import {Component, HostListener, OnInit} from '@angular/core';
import {PictureDto} from "../../shared/utility/dtos/PictureDto";
import {firstValueFrom} from "rxjs";
import {Location, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {extractQueryParams} from "../../shared/utility/extractQueryParams";
import {UrlTransformModule} from "../../shared/utility/pipes/url-transform/url-transform.module";
import {Router, RouterLink} from "@angular/router";
import {TagComponent} from "../../shared/components/tag/tag.component";
import {LikeBtnComponent} from "../../shared/components/like-btn/like-btn.component";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {CommentDto} from "../../shared/utility/dtos/CommentDto";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {CommentsDisplayComponent} from "./comments-display/comments-display.component";
import {PictureService} from "../../services/api/picture/picture.service";

@Component({
  selector: 'pp-view-picture-modal',
  templateUrl: './view-picture-modal.component.html',
  styleUrls: ['./view-picture-modal.component.scss'],
  standalone: true,
  imports: [
    UrlTransformModule,
    NgTemplateOutlet,
    NgIf,
    RouterLink,
    NgForOf,
    NgClass,
    TagComponent,
    LikeBtnComponent,
    CommentFormComponent,
    CommentFormComponent,
    CommentsDisplayComponent,
  ],
  animations: [
    fadeInAnimation
  ]
})
export class ViewPictureModalComponent implements OnInit {
  pic: PictureDto | undefined;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateTemplateDisplay();
  }

  constructor(
    private picService: PictureService,
    private location: Location,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.updateTemplateDisplay();
    const queryParams = extractQueryParams(this.location.path());
    const picId = queryParams['viewPicture'];
    if (picId) {
      try {
        this.pic = await firstValueFrom(this.picService.getById(picId));
      } catch (e) {
        this.router.navigate([""], {queryParams: null})
      }
    }
  }

  private updateTemplateDisplay(): void {
    this.isMobile = window.innerWidth < 768;
  }

  onCommentAdd(comment: CommentDto) {
    this.pic!.comments ? this.pic!.comments = [comment, ...this.pic!.comments] : this.pic!.comments = [comment];
  }

  closeModal() {
    this.router.navigate([], {queryParams: {}})
  }

}
