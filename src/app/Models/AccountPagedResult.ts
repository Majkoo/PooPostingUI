import {AccountModel} from "./AccountModel";

export interface AccountPagedResult {
  items: AccountModel[];
  totalItems: number;
  pageSize: number;
  page: number;
}
