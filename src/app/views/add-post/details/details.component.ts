import {AfterContentInit, Component, inject} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-details',
  template: `
    <div
      class="flex flex-col"
      @fadeIn
    >

      <div class="flex flex-col">
        Description:
        <textarea></textarea>
      </div>

      <div class="flex flex-col">
        Tags:
        <input type="text">
      </div>

      <div class="flex flex-col">
        visibility:
        <input type="radio" value="test1">
        <input type="radio" value="test2">
        <input type="radio" value="test3">
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
          [disabled]="!canProceed"
          (click)="goNext()"
        >
          Next step
        </button>
      </div>
    </div>
  `,
  styles: [],
  animations: [fadeInAnimation]
})
export class DetailsComponent implements AfterContentInit {

  private addPostService = inject(AddPostService);
  private router = inject(Router);

  post = this.addPostService.post;

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/upload']);
  }

  async goBack() {
    await this.router.navigate(['/add-post/upload'])
  }

  async goNext() {
    if (this.canProceed) {
      this.addPostService.updatePost(this.post);
      await this.router.navigate(['/add-post/details'])
    }
  }

  get canProceed() {
    return this.addPostService.canGoToReview;
  }
}
