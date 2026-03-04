import type { MenuIcon } from "@next-core/brick-types";
import type { CardProps } from "antd/lib/card";

export enum CardLayoutType {
  ICON_AS_BACKGROUND = "icon-as-background",
  ICON_SMALL_ALIGN_LEFT = "icon-small-align-left",
  ICON_ALIGN_RIGHT = "icon-align-right",
  ICON_ALIGN_LEFT = "icon-align-left",
  ICON_ALIGN_MIDDLE = "icon-align-middle",
  BLOCK_ICON_ALIGN_LEFT = "block-icon-align-left",
}

export type Color =
  | "green"
  | "red"
  | "blue"
  | "orange"
  | "cyan"
  | "purple"
  | "geekblue"
  | "gray";

export interface DescriptionItem {
  label: string;
  field?: string;
  value?: string;
}

export interface CardItemProps {
  cardLayoutType?: CardLayoutType;
  fields?: {
    cardTitle?: string;
    cardSubtitle?: string;
    newDescription?: string;
    topInformation?: string;
    descriptionList?: string;
    icon?: string;
    iconColor?: string;
    iconStyle?: string;
    iconSize?: string;
    iconOffsetX?: string;
    iconOffsetY?: string;
    iconOpacity?: string;
    disabled?: string;
  };
  dataSource?: Record<string, any>;
  urlTemplate?: string;
  hasOperateSlot?: boolean;
  hasExtraOperateSlot?: boolean;
  hasBottomRightOperateSlot?: boolean;
  onlyOperateSlot?: boolean;
  cardTitle?: string;
  cardSubtitle?: string;
  newDescription?: string;
  topInformation?: string;
  descriptionList?: string[] | string | DescriptionItem[];
  descMaxLine?: number;
  hideDescCircle?: boolean;
  url?: string;
  href?: string;
  target?: string;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  iconColor?: Color;
  iconSize?: string | number;
  iconOffsetX?: string | number;
  iconOffsetY?: string | number;
  iconOpacity?: number;
  tagConfig?: {
    text: string;
    field?: string;
    value?: any;
    isNotEqual?: boolean; //增加下逻辑
    hideOperate?: boolean;
    color?: Color;
    triangle?: boolean;
  };
  configProps?: CardProps;
  bordered?: boolean;
  showOperationAreaWhenHovering?: boolean;
  alwaysShowDescription?: boolean;
  descriptionDataType?: "list" | "section";
  hoverable?: boolean;
  disabled?: boolean;
  reverseBgColor?: boolean;
  imgSrc?: string;
  showImg?: boolean;
  imgSize?: number;
  shape?: "circle" | "square" | "round-square";
  useLinkBehavior?: boolean;
  useAfterDescriptionSlot?: boolean;
}

export interface CardItemEvents {
  "presentational-bricks.card-item.click": CustomEvent<any>;
}

export interface CardItemEventsMap {
  onPresentationalBricksCardItemClick: "presentational-bricks.card-item.click";
}

export declare class CardItemElement extends HTMLElement {
  cardLayoutType: CardLayoutType | undefined;
  fields:
    | {
        cardTitle?: string;
        cardSubtitle?: string;
        newDescription?: string;
        topInformation?: string;
        descriptionList?: string;
        icon?: string;
        iconColor?: string;
        iconStyle?: string;
        iconSize?: string;
        iconOffsetX?: string;
        iconOffsetY?: string;
        iconOpacity?: string;
        disabled?: string;
      }
    | undefined;
  dataSource: Record<string, any> | undefined;
  urlTemplate: string | undefined;
  hasOperateSlot: boolean | undefined;
  hasExtraOperateSlot: boolean | undefined;
  hasBottomRightOperateSlot: boolean | undefined;
  onlyOperateSlot: boolean | undefined;
  cardTitle: string | undefined;
  cardSubtitle: string | undefined;
  newDescription: string | undefined;
  topInformation: string | undefined;
  descriptionList: string[] | string | DescriptionItem[] | undefined;
  descMaxLine: number | undefined;
  hideDescCircle: boolean | undefined;
  url: string | undefined;
  href: string | undefined;
  target: string | undefined;
  icon: MenuIcon | undefined;
  iconStyle: Record<string, any> | undefined;
  iconColor: Color | undefined;
  iconSize: string | number | undefined;
  iconOffsetX: string | number | undefined;
  iconOffsetY: string | number | undefined;
  iconOpacity: number | undefined;
  tagConfig:
    | {
        text: string;
        field?: string;
        value?: any;
        isNotEqual?: boolean; //增加下逻辑
        hideOperate?: boolean;
        color?: Color;
        triangle?: boolean;
      }
    | undefined;
  configProps: CardProps | undefined;
  bordered: boolean | undefined;
  showOperationAreaWhenHovering: boolean | undefined;
  alwaysShowDescription: boolean | undefined;
  descriptionDataType: "list" | "section" | undefined;
  hoverable: boolean | undefined;
  disabled: boolean | undefined;
  reverseBgColor: boolean | undefined;
  imgSrc: string | undefined;
  showImg: boolean | undefined;
  imgSize: number | undefined;
  shape: "circle" | "square" | "round-square" | undefined;
  useLinkBehavior: boolean | undefined;
  useAfterDescriptionSlot: boolean | undefined;
}
