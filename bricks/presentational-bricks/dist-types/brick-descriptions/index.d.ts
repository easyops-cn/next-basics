import type { UseBrickConf } from "@next-core/brick-types";
import type { DescriptionsProps } from "antd/lib/descriptions";

export interface DescriptionsItemProps {
  label: string;
  text: string;
}

export interface DescriptionListProps {
  itemList: BrickDescriptionsItemProps[];
  descriptionTitle: string;
  configProps?: DescriptionsProps;
  column?: number;
  size?: SizeType;
  bordered?: boolean;
  layout?: LayoutType;
  hideGroups?: string[] | string;
  extraBrick?: {
    useBrick: UseBrickConf;
  };
}

export interface BrickDescriptionsItemProps
  extends Partial<DescriptionsItemProps> {
  /**
   * 内容
   */
  text: string;
  id?: string;
  /**
   * 所属分组
   */
  group?: string;
  /**
   * 该 item 的 text 取自 dataSource 的哪个字段
   */
  field?: string;
  /**
   * 支持为某项自定义展示构件  [#UseBrickConf](#usebrickconf)
   */
  useBrick?: UseBrickConf;
  /**
   * [已废弃]自定义该 item 的展示构件
   */
  component?: {
    brick?: string;
    properties?: any;
  };
}

export type SizeType = "default" | "middle" | "small";

export type LayoutType = "horizontal" | "vertical";

export interface BrickDescriptionsProps {
  descriptionTitle?: string;
  descriptionList?: DescriptionListProps[];
  itemList?: BrickDescriptionsItemProps[];
  itemIdBrickMap?: Record<string, { useBrick: UseBrickConf }>;
  showCard?: boolean;
  column?: number;
  layout?: LayoutType;
  bordered?: boolean;
  size?: SizeType;
  configProps?: DescriptionsProps;
  hideGroups?: string[] | string;
  dataSource?: Record<string, any>;
}

export declare class BrickDescriptionsElement extends HTMLElement {
  descriptionTitle: string | undefined;
  descriptionList: DescriptionListProps[] | undefined;
  itemList: BrickDescriptionsItemProps[] | undefined;
  itemIdBrickMap: Record<string, { useBrick: UseBrickConf }> | undefined;
  showCard: boolean | undefined;
  column: number | undefined;
  layout: LayoutType | undefined;
  bordered: boolean | undefined;
  size: SizeType | undefined;
  configProps: DescriptionsProps | undefined;
  hideGroups: string[] | string | undefined;
  dataSource: Record<string, any> | undefined;
}
