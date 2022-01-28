import {Picture} from "./Picture";

export interface PicturePagedResult {
  items: Picture[];
  totalPages: number;
  page: number;
}
