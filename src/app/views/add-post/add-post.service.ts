import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Subject } from "rxjs";
import {CropPictureData} from "./models/cropPictureData";
import {PostDetailsData} from "./models/postDetailsData";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {CreatePictureDto, toFormData} from "./models/createPictureDto";

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
      concatMap(() => {
        const formData = toFormData(this.inMemoryCreatePictureDto as CreatePictureDto);

        return this.httpClient.post(this.postPictureUrl, formData).pipe(
          switchMap(() => {
            this.toastrService.success("Successfully posted a picture");
            this.postDetailsData$.next({});
            return this.router.navigate(['/']);
          }),
          catchError(() => {
            this.toastrService.error(defaultErrorHeading);
            return this.router.navigate(['/add-post']);
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
