import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UpdatePictureNameDto} from "../../shared/utility/dtos/UpdatePictureNameDto";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";
import {UpdatePictureDescriptionDto} from "../../shared/utility/dtos/UpdatePictureDescriptionDto";
import {UpdatePictureTagsDto} from "../../shared/utility/dtos/UpdatePictureTagsDto";

@Injectable({
  providedIn: 'root'
})
export class PictureUpdateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  updatePictureName(data: UpdatePictureNameDto, id: string) {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/name`,
        data,
        { responseType: "json" }
      );
  }

  updatePictureDescription(data: UpdatePictureDescriptionDto, id: string) {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/description`,
        data,
        { responseType: "json" }
      );
  }

  updatePictureTags(data: UpdatePictureTagsDto, id: string) {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.picturesApiUrl}/picture/${id}/update/tags`,
        data,
        { responseType: "json" }
      );
  }

}
