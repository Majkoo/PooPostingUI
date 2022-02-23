import {LikeModel} from "./LikeModel";

export interface Picture {
  id: string;
  accountId: string;
  accountNickname: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
  pictureAdded: string;
  likes: LikeModel[];
  likeCount: number;
  dislikeCount: number;
  isLiked: boolean;
  isDisliked: boolean;
}
