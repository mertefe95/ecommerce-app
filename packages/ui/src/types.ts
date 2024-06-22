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

export enum SubTableType {
  BASIC = 'Basic',
  ADVANCED = 'Advanced',
}

export interface FilterOption {
  id: string;
  label: string;
  options: { id: number; name: string }[];
  defaultValue?: any;
}
