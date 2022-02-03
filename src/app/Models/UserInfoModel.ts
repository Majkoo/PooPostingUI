import {AccountModel} from "./AccountModel";
import { LikeModel } from "./LikeModel";

export interface UserInfoModel {
  accountDto: AccountModel;
  likedTags: string;
  authToken: string;
  likes: LikeModel[];
}
