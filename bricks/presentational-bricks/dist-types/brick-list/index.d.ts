import type { ListProps } from "antd/lib/list";
import type { ListItemMetaProps } from "antd/lib/list/Item";

export interface ItemProps extends ListItemProps {
  meta: MetaProps;
  content: string;
}

export interface MetaProps extends ListItemMetaProps {
  src: string;
  title: string;
  description: string;
}

export interface ItemBrick {
  brick: string | any;
  properties?: Record<string, any>;
}

export interface BrickListProps {
  showCard?: boolean;
  itemList?: ItemProps[];
  configProps?: ListProps<any>;
  fields?: any;
  dataSource?: any;
  itemBrick?: ItemBrick;
  itemStyle?: any;
  isCardList?: boolean;
}

export declare class BrickListElement extends HTMLElement {
  showCard: boolean | undefined;
  itemList: ItemProps[] | undefined;
  configProps: ListProps<any> | undefined;
  fields: any | undefined;
  dataSource: any | undefined;
  itemBrick: ItemBrick | undefined;
  itemStyle: any | undefined;
  isCardList: boolean | undefined;
}
