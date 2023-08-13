import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {PagedResult} from "../../../shared/utility/dtos/PagedResult";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private getPicturesUrl = `${environment.apiUrl}/picture`

  private httpClient: HttpClient = inject(HttpClient);

  async get(pageSize = 5, pageNumber = 1): Promise<PagedResult<PictureDto>> {
      return firstValueFrom(
        this.httpClient
          .get<PagedResult<PictureDto>>(`${this.getPicturesUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      );
  }

}
