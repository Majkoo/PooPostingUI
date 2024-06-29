import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {PictureUploadData} from "./models/pictureUploadData";
import {PostDetailsData} from "./models/postDetailsData";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private router = inject(Router);

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
  finish() {
    const formData = new FormData();
    formData.append("dataUrl", this.pictureUploadData.croppedFileUrl);
    formData.append("visibilityOption", this.postDetailsData.visibilityOption?.toString());
    formData.append("name", "DefaultName");
    if (this.postDetailsData.tags) formData.append("tags", this.postDetailsData.tags.join(","))
    if (this.postDetailsData.description) formData.append("description", this.postDetailsData.description)

    this.httpClient.post(this.postPictureUrl, formData)
      .pipe(
        tap(() => {
          this.toastrService.success("Successfully posted a picture");
          this.pictureUploadData$.next({});
          this.postDetailsData$.next({});
          this.router.navigate(['/'])
        }),
        catchError((e) => {
          this.toastrService.error(
            e.error.errors['Tags'][0] || e.error.errors['DataUrl'][0] || e.error.errors['Description'][0] || e.error.errors['Name'][0],
            defaultErrorHeading
          );

          return this.router.navigate(['/add-post'])
        }),
      ).subscribe();
  }

  get cropBoxData(): Cropper.SetCropBoxDataOptions {
    const currentCropBoxData = this.pictureUploadData.cropBoxData;
    return {
      width: currentCropBoxData?.width || undefined,
      top: currentCropBoxData?.top || undefined,
      left: currentCropBoxData?.left || undefined
    };
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
    return this.canGoToDetails;
      // &&
      // this.postDetailsData$.value.visibilityOption !== null &&
      // this.postDetailsData$.value.visibilityOption !== undefined;
  }
  get canFinish() {
    return this.canGoToReview;
  }

}
