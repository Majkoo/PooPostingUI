import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PutPostCommentDto} from "../../shared/utility/dtos/PutPostCommentDto";
import {CommentDto} from "../../shared/utility/dtos/CommentDto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  patchComment(picId: string, data: PutPostCommentDto): Observable<CommentDto> {
    return this.httpClient
      .patch<CommentDto>(
        `${environment.picturesApiUrl}/comment/${picId}`,
        data,
        { responseType: "json"}
      );
  }
  deleteComment(commId: string): Observable<null> {
    return this.httpClient
      .delete<null>(
        `${environment.picturesApiUrl}/comment/${commId}`,
        { responseType: "json"}
      );
  }

}
