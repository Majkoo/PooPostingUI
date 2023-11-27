import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {PictureUploadData} from "./models/pictureUploadData";
import {PostDetailsData} from "./models/postDetailsData";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private pictureUploadData$ = new BehaviorSubject<Partial<PictureUploadData>>({
    cropBoxData: {
      left: null,
      top: null,
      width: null,
    },
    rawFileUrl: '',
    croppedFileUrl: '',
    aspectRatio: 4/3
  });
  private postDetailsData$ = new BehaviorSubject<Partial<PostDetailsData>>({});
  private httpClient = inject(HttpClient);
  private toastrService = inject(ToastrService);
  private postPictureUrl = `${environment.apiUrl}/picture/post`;

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
  async finish(): Promise<boolean> {
    const formData = new FormData();

    formData.append("dataUrl", this.pictureUploadData.croppedFileUrl);
    formData.append("visibilityOption", this.postDetailsData.visibilityOption.toString());
    formData.append("name", "DefaultName");
    if (this.postDetailsData.tags) formData.append("tags", this.postDetailsData.tags)
    if (this.postDetailsData.description) formData.append("description", this.postDetailsData.description)

    try {
      await firstValueFrom(this.httpClient.post(this.postPictureUrl, formData));
      this.toastrService.success("Successfully posted a picture");
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this.toastrService.error(
          e.error.errors['Tags'][0] || e.error.errors['DataUrl'][0] || e.error.errors['Description'][0] || e.error.errors['Name'][0],
          defaultErrorHeading
        );
      }
      this.pictureUploadData$.next({});
      this.postDetailsData$.next({});
      return false;
    }

    return true;
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
