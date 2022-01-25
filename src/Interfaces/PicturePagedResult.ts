import {Picture} from "./Picture";

export interface PicturePagedResult {
  Items: Picture[];
  TotalPages: number;
  ItemsFrom: number;
  ItemsTo: number;
  TotalItemsCount: number;
}
