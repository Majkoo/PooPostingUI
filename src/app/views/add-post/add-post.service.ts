import { Injectable } from '@angular/core';
import {AddPostDto} from "../../shared/utility/dtos/AddPostDto";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  post$  = new BehaviorSubject<Partial<AddPostDto>>({});
  postSubmit$ = new Subject<AddPostDto>();
  fileUrl$ = new BehaviorSubject<string>('');
  fileAspectRatio$ = new BehaviorSubject<number>(3/4);

  updatePost(dto: Partial<AddPostDto>) {
    this.post$.next({
        ...this.post$.value,
        ...dto
      });
  }

  updateFileUrl(val: string) {
    this.fileUrl$.next(val);
  }

  updateFileAspectRatio(val: number) {
    this.fileAspectRatio$.next(val);
  }

  finish() {
    if (this.canFinish) {
      this.postSubmit$.next(this.post$.value as AddPostDto);
      this.post$.next({});
    }
  }

  get fileAspectRatio(): number {
    return this.fileAspectRatio$.value;
  }

  get fileUrl(): string {
      return this.fileUrl$.value;
  }

  get post(): Partial<AddPostDto> {
    return this.post$.value;
  }

  get canGoToDetails() {
    return this.post$ && this.post$.value.file;
  }

  get canGoToReview() {
    return this.canGoToDetails && this.post$.value.visibilityOption;
  }

  get canFinish() {
    return this.canGoToReview;
  }

}
