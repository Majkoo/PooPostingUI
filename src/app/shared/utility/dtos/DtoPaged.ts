export interface DtoPaged<T> {
  items: T[];
  totalPages: number;
  totalItems: number;
  page: number;
}
