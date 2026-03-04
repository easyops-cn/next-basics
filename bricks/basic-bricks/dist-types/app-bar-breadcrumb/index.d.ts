import type { BreadcrumbItemConf, SidebarMenu } from "@next-core/brick-types";

export interface AppbarBreadcrumbProps {
  breadcrumb?: BreadcrumbItemConf[];
  noCurrentApp?: boolean;
  menu?: Partial<SidebarMenu>;
}

export declare class AppbarBreadcrumbElement extends HTMLElement {
  breadcrumb: BreadcrumbItemConf[] | undefined;
  noCurrentApp: boolean | undefined;
  menu: Partial<SidebarMenu> | undefined;
}
