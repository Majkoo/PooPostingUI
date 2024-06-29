import {AfterContentInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {PostDetailsData} from "../models/postDetailsData";
import {NgForm} from "@angular/forms";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'pp-details',
  template: `
    <form
      class="flex flex-col gap-3"
      #form="ngForm"
      @fadeIn
    >

      <div class="flex flex-col gap-1">
        Description:
        <textarea
          class="border-2 p-2 rounded-lg"
          rows="3"
          placeholder="Post description..."
          [(ngModel)]="postDetailsTemp.description"
          name="description"
          [maxlength]="150"
        ></textarea>
      </div>

      <div class="flex flex-col gap-1">
        Tags:
        <input
          type="text"
          class="border-2 px-2 py-1 rounded-lg"
          placeholder="Post tags..."
          name="tags"
          [(ngModel)]="tagsString"
        >
      </div>

      <!--      <div class="flex flex-col gap-1">-->
      <!--        Post Visibility:-->
      <!--        <div class="ml-2">-->
      <!--          <div class="flex flex-row gap-1">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="public"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.PUBLIC"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="public">Public</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-1">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="feed"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.FEED"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="feed">Feed only</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-1">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="private"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.PRIVATE"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="private">Private</label>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

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
export class DetailsComponent implements AfterContentInit, OnDestroy {
  @ViewChild('form', {static: true}) form!: NgForm;
  private addPostService = inject(AddPostService);
  private router = inject(Router);

  postDetailsTemp: Partial<PostDetailsData> = {};
  tagsString: string = "";
  sub = new Subscription();

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/upload']);
    this.postDetailsTemp = this.addPostService.postDetailsData;

    this.sub = this.form.valueChanges!.pipe(
      tap((val) => {
        this.postDetailsTemp = {
          ...val,
          tags: this.tagsString.split(" ").filter(t => t != "") ?? []
        };
        console.log(this.tagsString.split(" ").filter(t => t != "") ?? []);
        this.addPostService.updatePostDetailsData(this.postDetailsTemp);
      }),
    ).subscribe();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async goBack() {
    await this.router.navigate(['/add-post/upload']);
  }

  async goNext() {
    if (this.canProceed) {
      await this.router.navigate(['/add-post/review'])
    }
  }

  get canProceed() {
    return this.addPostService.canGoToReview;
  }

  get tags() {
    return this.postDetailsTemp.tags;
  }
}
