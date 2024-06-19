export type DataList<Data> = {
  totalRows: number;
  data: Data[];
};

export type InfiniteScrollData<Data> = {
  pages: Data[];
  pageParams: number[];
};

export enum DataTableType {
  INFINITE_SCROLL = 'Infinite Scroll',
  PAGINATION = 'Pagination',
  NORMAL = 'Normal',
}
