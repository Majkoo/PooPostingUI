import {AfterContentInit, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {AddPostService} from "../add-post.service";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {CreatedPostData} from "../models/createdPostData";

@Component({
  selector: 'pp-review',
  template: `
    <pp-created-post-card-preview *ngIf="createdPostData" [postData]="createdPostData" @fadeIn />

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
        Submit
      </button>
    </div>
  `,
  animations: [fadeInAnimation]
})
export class ReviewComponent implements AfterContentInit {
  private router = inject(Router);
  private addPostService = inject(AddPostService);

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/details']);
  }

  async goBack() {
    await this.router.navigate(['/add-post/details']);
  }

  async finish() {
    if (this.canFinish) {
      const result = await this.addPostService.finish();
      if (result) await this.router.navigate(['/']);
      else await this.router.navigate(['/add-post']);
    }
  }

  get canFinish() {
    return this.addPostService.canFinish && this.createdPostData;
  }

  get createdPostData(): CreatedPostData {
    return {
      ...this.addPostService.postDetailsData,
      url: this.addPostService.pictureUploadData.croppedFileUrl,
    }
  }

}
