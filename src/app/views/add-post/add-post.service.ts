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
  pictureDetailsData$ = new BehaviorSubject<Partial<PostDetailsData>>({});

  updatePictureUploadData(val: Partial<PictureUploadData>) {
    this.pictureUploadData$.next({
      ...this.pictureUploadData$.value,
      ...val
    });
  }

  finish() {
    if (this.canFinish) {
      this.postSubmit$.next({
        file: this.pictureUploadData.croppedFileUrl,
        description: this.pictureDetailsData.description,
        tags: this.pictureDetailsData.tags ?? [],
        visibilityOption: this.pictureDetailsData.visibilityOption
      });

      this.pictureUploadData$.next({});
      this.pictureDetailsData$.next({});
    }
  }

  get cropBoxData() {
    const currentCropBoxData = this.pictureUploadData.cropBoxData;
    let cropBoxData = {};
    cropBoxData = {
      width: currentCropBoxData?.width ?? currentCropBoxData.width,
      top: currentCropBoxData?.top ?? currentCropBoxData.top,
      left: currentCropBoxData?.left ?? currentCropBoxData.left
    };
    return cropBoxData;
  }
  get pictureUploadData(): PictureUploadData {
    return this.pictureUploadData$.value as PictureUploadData;
  }
  get pictureDetailsData(): PostDetailsData {
    return this.pictureDetailsData$.value as PostDetailsData;
  }
  get canGoToDetails() {
    return this.pictureUploadData$.value && this.pictureUploadData$.value.croppedFileUrl && this.pictureUploadData$.value.rawFileUrl;
  }
  get canGoToReview() {
    return this.canGoToDetails && this.pictureDetailsData$.value.visibilityOption;
  }
  get canFinish() {
    return this.canGoToReview;
  }

}
