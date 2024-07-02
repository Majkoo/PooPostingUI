import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, of, Subject, tap} from "rxjs";
import {CropPictureData} from "./models/cropPictureData";
import {PostDetailsData} from "./models/postDetailsData";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {CreatePictureDto} from "./models/createPictureDto";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private router = inject(Router);

  private postDetailsData$ = new BehaviorSubject<Partial<PostDetailsData>>({});
  private httpClient = inject(HttpClient);
  private toastrService = inject(ToastrService);

  private postPictureUrl = `${environment.apiUrl}/picture/post`;

  postTrigger$ = new Subject<void>(); // Subject to trigger the POST request
  finish() {
    this.postTrigger$.next();
  }

  // private submitObservable

  public inMemoryCreatePictureDto: Partial<CreatePictureDto> = {}
  public inMemoryCropPictureData: CropPictureData = {
    cropBoxData: {},
    rawFileUrl: '',
    aspectRatio: 4/3
  }

  constructor() {
    this.postTrigger$.pipe(
      switchMap(() => {
        const formData = new FormData();
        if (!this.inMemoryCreatePictureDto.url) return of(null);
        formData.append("dataUrl", this.inMemoryCreatePictureDto.url);
        formData.append("visibilityOption", (this.inMemoryCreatePictureDto.visibilityOption ?? 0).toString());
        if (this.inMemoryCreatePictureDto.tags) formData.append("tags", JSON.stringify(this.inMemoryCreatePictureDto.tags));
        if (this.inMemoryCreatePictureDto.description) formData.append("description", this.inMemoryCreatePictureDto.description);

        return this.httpClient.post(this.postPictureUrl, formData).pipe(
          tap(() => {
            this.toastrService.success("Successfully posted a picture");
            this.postDetailsData$.next({});
            this.router.navigate(['/']);
          }),
          catchError((e) => {
            this.toastrService.error(
              e.error.errors['Tags'][0] || e.error.errors['DataUrl'][0] || e.error.errors['Description'][0] || e.error.errors['Name'][0],
              defaultErrorHeading
            );
            this.router.navigate(['/add-post']);
            return of(null); // Return an observable to complete the error handling
          })
        );
      })
    ).subscribe();
  }

  get canGoToDetails() {
    return this.inMemoryCreatePictureDto?.url && this.inMemoryCropPictureData.rawFileUrl;
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
