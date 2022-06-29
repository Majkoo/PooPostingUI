import {LikeModel} from "./LikeModel";
import {CommentModel} from "./CommentModel";

export interface PictureModel {
  id: string;
  accountId: string;
  accountNickname: string;

  name: string;
  description: string;
  tags: string[];
  url: string;
  pictureAdded: string;

  likes: LikeModel[];
  comments: CommentModel[];

  likeCount: number;
  dislikeCount: number;

  likeState: number;
  isModifiable: boolean;
  isAdminModifiable: boolean;

  isAdv?: boolean;
}
