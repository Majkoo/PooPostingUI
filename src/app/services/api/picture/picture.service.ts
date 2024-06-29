import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import { PictureDto } from '../../../shared/utility/dtos/PictureDto';
import { PagedResult } from '../../../shared/utility/dtos/PagedResult';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private getPicturesUrl = `${environment.apiUrl}/picture`;
  private updatedPictureSubject = new Subject<PictureDto>();
  constructor(private httpClient: HttpClient) {}

  get(pageSize = 5, pageNumber = 1): Observable<PagedResult<PictureDto>> {
    return this.httpClient.get<PagedResult<PictureDto>>(
      `${this.getPicturesUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  getLiked(pageSize = 5, pageNumber = 1, accId: string): Observable<PagedResult<PictureDto>> {
    return this.httpClient.get<PagedResult<PictureDto>>(
      `${environment.apiUrl}/account/${accId}/picture/liked?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }

  getById(id: string): Observable<PictureDto> {
    return this.httpClient.get<PictureDto>(`${this.getPicturesUrl}/${id}`);
  }

  get updatedPicture$(): Observable<PictureDto> {
    return this.updatedPictureSubject.asObservable();
  }
}
