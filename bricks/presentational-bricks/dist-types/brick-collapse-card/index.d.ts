import type { MenuIcon } from "@next-core/brick-types";

export interface descriptionsItemProps {
  label: string;
  text: string;
}

export interface BrickCollapseCardProps {
  cardTitle?: string;
  descriptionList?: descriptionsItemProps[];
  expandInactiveText?: any;
  expandActiveText?: any;
  expandActiveIcon?: string;
  expandInactiveIcon?: string;
  titleIcon?: MenuIcon | string;
  titleWithIconAndDesc?: boolean | "compact";
  isActive?: boolean;
  hasHeaderSlot?: boolean;
  containerStyle?: any;
  headerStyle?: any;
  contentStyle?: any;
  verticalCenter?: boolean;
  title?: string;
  fields?: { dataSource?: string; title: string };
  dataSource?: Record<string, any>;
}

export declare class BrickCollapseCardElement extends HTMLElement {
  cardTitle: string | undefined;
  descriptionList: descriptionsItemProps[] | undefined;
  expandInactiveText: any | undefined;
  expandActiveText: any | undefined;
  expandActiveIcon: string | undefined;
  expandInactiveIcon: string | undefined;
  titleIcon: MenuIcon | string | undefined;
  titleWithIconAndDesc: boolean | "compact" | undefined;
  isActive: boolean | undefined;
  hasHeaderSlot: boolean | undefined;
  containerStyle: any | undefined;
  headerStyle: any | undefined;
  contentStyle: any | undefined;
  verticalCenter: boolean | undefined;
  title: string;
  fields: { dataSource?: string; title: string } | undefined;
  dataSource: Record<string, any> | undefined;
}
