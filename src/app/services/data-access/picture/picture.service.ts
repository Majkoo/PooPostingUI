import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PictureDto } from '../../../shared/utility/dtos/PictureDto';
import { PagedResult } from '../../../shared/utility/dtos/PagedResult';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private getPicturesUrl = `${environment.apiUrl}/picture`;

  constructor(private httpClient: HttpClient) {}

  get(pageSize = 5, pageNumber = 1): Observable<PagedResult<PictureDto>> {
    return this.httpClient.get<PagedResult<PictureDto>>(
      `${this.getPicturesUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }
}
