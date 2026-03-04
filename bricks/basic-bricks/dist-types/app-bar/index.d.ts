import type { BreadcrumbItemConf } from "@next-core/brick-types";

export interface AppBarProps {
  pageTitle?: string;
  documentId?: string;
  noCurrentApp?: boolean;
  breadcrumb?: BreadcrumbItemConf[];
}

export declare class AppBarElement extends HTMLElement {
  pageTitle: string | undefined;
  documentId: string | undefined;
  noCurrentApp: boolean | undefined;
  breadcrumb: BreadcrumbItemConf[] | undefined;
}
