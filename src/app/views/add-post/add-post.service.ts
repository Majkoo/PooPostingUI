import { Injectable } from '@angular/core';
import {AddPostDto} from "../../shared/utility/dtos/AddPostDto";
import {BehaviorSubject, Subject} from "rxjs";
import {PictureUploadData} from "./models/pictureUploadData";
import {PostDetailsData} from "./models/postDetailsData";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  postSubmit$ = new Subject<AddPostDto>();

  pictureUploadData$ = new BehaviorSubject<Partial<PictureUploadData>>({
    cropBoxData: {
      left: null,
      top: null,
      width: null,
    },
    rawFileUrl: '',
    croppedFileUrl: '',
    aspectRatio: 3/4
  });
  postDetailsData$ = new BehaviorSubject<Partial<PostDetailsData>>({});

  updatePictureUploadData(val: Partial<PictureUploadData>) {
    this.pictureUploadData$.next({
      ...this.pictureUploadData$.value,
      ...val
    });
  }

  updatePostDetailsData(val: Partial<PostDetailsData>) {
    this.postDetailsData$.next({
      ...this.postDetailsData$.value,
      ...val
    });
  }

  finish() {
    if (this.canFinish) {
      const post = {
        file: this.pictureUploadData.croppedFileUrl,
        description: this.postDetailsData.description,
        tags: this.postDetailsData.tags ?? [],
        visibilityOption: this.postDetailsData.visibilityOption
      }
      this.postSubmit$.next(post);
      // todo: call backend with given form data

      this.pictureUploadData$.next({});
      this.postDetailsData$.next({});
    }
  }

  get cropBoxData() {
    const currentCropBoxData = this.pictureUploadData.cropBoxData;
    let cropBoxData = {};
    cropBoxData = {
      width: currentCropBoxData?.width || null,
      top: currentCropBoxData?.top || null,
      left: currentCropBoxData?.left || null
    };
    return cropBoxData;
  }
  get pictureUploadData(): PictureUploadData {
    return this.pictureUploadData$.value as PictureUploadData;
  }
  get postDetailsData(): PostDetailsData {
    return this.postDetailsData$.value as PostDetailsData;
  }
  get canGoToDetails() {
    return this.pictureUploadData$.value && this.pictureUploadData$.value.croppedFileUrl && this.pictureUploadData$.value.rawFileUrl;
  }
  get canGoToReview() {
    return this.canGoToDetails &&
      this.postDetailsData$.value.visibilityOption !== null &&
      this.postDetailsData$.value.visibilityOption !== undefined;
  }
  get canFinish() {
    return this.canGoToReview;
  }

}
