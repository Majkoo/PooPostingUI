import {AccountModel} from "./ApiModels/AccountModel";
import {LikeModel} from "./ApiModels/LikeModel";

export interface UserInfoModel {
  accountDto: AccountModel;
  likedTags: string;
  authToken: string;
  likes: LikeModel[];
}
