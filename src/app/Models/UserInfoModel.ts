import {AccountModel} from "./AccountModel";

export interface UserInfoModel {
  accountDto: AccountModel
  authToken: string;
}
