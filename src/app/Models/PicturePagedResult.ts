import {Picture} from "./Picture";

export interface PicturePagedResult {
  items: Picture[];
  totalItems: number;
  pageSize: number;
  page: number;
}
