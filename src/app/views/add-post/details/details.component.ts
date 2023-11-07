import {AfterContentInit, Component, inject} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-details',
  template: `
    <form
      class="flex flex-col gap-3"
      @fadeIn
    >

      <div class="flex flex-col gap-1">
        Description:
        <textarea class="border-2 p-2 rounded-lg" rows="3" placeholder="Post description..."></textarea>
      </div>

      <div class="flex flex-col gap-1">
        Tags:
        <input type="text" class="border-2 px-2 py-1 rounded-lg" placeholder="Post tags...">
      </div>

      <div class="flex flex-col gap-1">
        Post Visibility:
        <div class="ml-2">
          <div class="flex flex-row gap-1">
            <input type="radio" id="public" name="visibility" value="0">
            <label for="public">Public</label>
          </div>
          <div class="flex flex-row gap-1">
            <input type="radio" id="feed" name="visibility" value="1">
            <label for="feed">Feed only</label>
          </div>
          <div class="flex flex-row gap-1">
            <input type="radio" id="private" name="visibility" value="2">
            <label for="private">Private</label>
          </div>
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
          [disabled]="!canProceed"
          (click)="goNext()"
        >
          Next step
        </button>
      </div>
    </form>
  `,
  styles: [],
  animations: [fadeInAnimation]
})
export class DetailsComponent implements AfterContentInit {

  private addPostService = inject(AddPostService);
  private router = inject(Router);

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/upload']);
  }

  async goBack() {
    await this.router.navigate(['/add-post/upload'])
  }

  async goNext() {
    if (this.canProceed) {
      await this.router.navigate(['/add-post/details'])
    }
  }

  get canProceed() {
    return this.addPostService.canGoToReview;
  }
}
