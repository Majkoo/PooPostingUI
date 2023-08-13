import {AccountPreviewDto} from "./AccountPreviewDto";
import {AccountDto} from "./AccountDto";
import {CommentDto} from "./CommentDto";

export interface PictureDto {
  id: string;
  account: AccountDto,

  name: string;
  description: string;
  tags: string[];
  url: string;
  pictureAdded: string;

  comment: CommentDto;
  commentCount: number;
  likeCount: number;
  dislikeCount: number;

  likeState: number;
  isModifiable: boolean;
  isAdminModifiable: boolean;
}
