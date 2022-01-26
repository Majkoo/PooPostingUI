import {Picture} from "./Picture";

export interface AccountModel {
  id: string;
  nickname: string;
  email: string;
  pictures: Picture[];
  accountCreated: string;
}
