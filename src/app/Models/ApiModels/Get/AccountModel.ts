import {PicturePreviewModel} from "./PicturePreviewModel";

export interface AccountModel {
  id: string;
  roleId: string;
  nickname: string;
  email: string;
  picturePreviews: PicturePreviewModel[];
  accountCreated: string;

  isModifiable: boolean;
  isAdminModifiable: boolean;
}
