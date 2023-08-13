export interface PagedResult<T> {
  items: T[];
  totalPages: number;
  pageSize: number;
  page: number;
}
