import type { PaginationProps } from "antd/lib/pagination";

export interface GeneralPaginationProps {
  page?: number;
  pageSize?: number;
  total?: number;
  onlyShowTotal?: boolean;
  dataSource?: Record<string, any>;
  configProps?: PaginationProps;
  fields?: any;
  shouldUpdateUrlParams?: boolean;
  shouldNotify?: boolean;
}

export interface GeneralPaginationEvents {
  "page.update": CustomEvent<{ page: number }>;
  "filter.update": CustomEvent<{ page: 1; pageSize: number }>;
}

export interface GeneralPaginationEventsMap {
  onPageUpdate: "page.update";
  onFilterUpdate: "filter.update";
}

export declare class GeneralPaginationElement extends HTMLElement {
  page: number | undefined;
  pageSize: number | undefined;
  total: number | undefined;
  onlyShowTotal: boolean | undefined;
  dataSource: Record<string, any> | undefined;
  configProps: PaginationProps | undefined;
  fields: any | undefined;
  shouldUpdateUrlParams: boolean | undefined;
  shouldNotify: boolean | undefined;
}
