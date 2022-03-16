import {PictureModel} from "./PictureModel";

export interface AccountModel {
  id: string;
  nickname: string;
  email: string;
  pictures: PictureModel[];
  accountCreated: string;
}
