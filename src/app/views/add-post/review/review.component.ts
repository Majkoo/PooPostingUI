import {AfterContentInit, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {AddPostService} from "../add-post.service";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-review',
  template: `
    <div class="pp-shadow w-full bg-surface-100 rounded-xl flex flex-col gap-2" *ngIf="pic">

      <!--  Image  -->
      <div class="flex rounded-t-xl justify-center items-center cursor-pointer">
        <img class="w-full rounded-t-xl select-none" @fadeIn src="{{pic.url}}" alt="{{pic.name}}">
      </div>

      <!--  Controls  -->
      <div class="flex justify-between items-center px-3">

        <a class="flex flex-row justify-between items-center gap-1">
<!--          <img class="w-8 h-8 rounded-3xl object-center object-contain" src="{{pic.account.profilePicUrl | urlTransform}}" alt="{{pic.account.nickname}}">-->
<!--          <p class="font-bold text-xl h-min lh flex justify-center items-center">{{pic.account.nickname}}</p>-->
        </a>

        <div class="flex items-start gap-1">
<!--          <pp-like-btn [(pic)]="pic"/>-->
          <button class="icon-dark m-0 icon-share">
          </button>
        </div>

      </div>

      <!--  Description  -->
      <p class="text-md px-3" *ngIf="pic.description">
        {{pic.description}}
      </p>

      <!--  Tags  -->
      <p class="flex gap-2 px-3" *ngIf="pic.tags?.length">
        <pp-tag *ngFor="let tag of pic.tags" [tag]="tag"/>
      </p>

      <!--  Comments  -->
      <ng-container  *ngIf="pic.commentCount && pic.comments?.length">
        <p class="font-bold text-lg px-3">Comments</p>

        <div class="flex flex-col gap-2 px-3">
<!--          <pp-mini-comment [comm]="pic.comments[0]" />-->
        </div>
      </ng-container>

      <!--  Comment form  -->
      <div routerLink="" [queryParams]="{viewPicture: pic.id}"
           class="cursor-pointer bg-surface-100 border-1 rounded-md text-xs text-gray-400 pp-shadow border-grey flex items-center justify-between m-3 mt-1 px-3">
        <p>Comment this...</p>
        <span class="icon-vector text text-lg"></span>
      </div>

    </div>

    <div class="mt-4 flex items-center justify-between">
      <button
        class="flex gap-1 text-white px-4 py-2 rounded-lg whitespace-nowrap bg-primary-800 disabled:opacity-60"
        (click)="goBack()"
      >
        Previous step
      </button>
      <button
        class="flex gap-1 text-white px-4 py-2 rounded-lg whitespace-nowrap bg-cta disabled:opacity-60"
        [disabled]="!canFinish"
        (click)="finish()"
      >
        Next step
      </button>
    </div>
  `,
  styles: [],
  animations: [fadeInAnimation]
})
export class ReviewComponent implements AfterContentInit {
  private router = inject(Router);
  private addPostService = inject(AddPostService);
  pic?: Partial<PictureDto>;

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/details']);
    // todo: create a mock pic with all data
    this.pic = {
      id: '',
      ...this.addPostService.postDetailsData,
      url: this.addPostService.pictureUploadData.croppedFileUrl,
    }
  }

  async goBack() {
    await this.router.navigate(['/add-post/details']);
  }

  async finish() {
    if (this.canFinish) {
      this.addPostService.finish();
    }
  }

  get canFinish() {
    return this.addPostService.canFinish;
  }

}
