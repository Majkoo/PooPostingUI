import {PictureModel} from "./PictureModel";

export interface PicturePagedResult {
  items: PictureModel[];
  totalItems: number;
  pageSize: number;
  page: number;
}
