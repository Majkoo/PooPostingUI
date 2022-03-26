import {PictureModel} from "./PictureModel";

export interface AccountModel {
  id: string;
  roleId: string;
  nickname: string;
  email: string;
  pictures: PictureModel[];
  accountCreated: string;
  isModifiable?: boolean;
  likeCount?: number;
  commentCount?: number;
}
