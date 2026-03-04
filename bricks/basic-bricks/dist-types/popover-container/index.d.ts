import type { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import type { TooltipPlacement } from "antd/lib/tooltip";
import type { ActionType, AlignType } from "rc-trigger/lib/interface";
import type { MenuIcon } from "@next-core/brick-types";
import type { UseBrickConf } from "@next-core/brick-types";

export interface PopoverContainerProps {
  data?: any;
  displayBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  popoverTitleBrick?: {
    useBrick: UseBrickConf;
  };
  align?: AlignType;
  popoverBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  popoverIcon?: MenuIcon;
  placement?: TooltipPlacement;
  trigger?: ActionType | ActionType[];
  triggerByIcon?: boolean;
  showPopoverBg?: boolean;
  popoverContentStyle?: Record<string, any>;
  showIcon?: "always" | "never" | "hover";
  zIndex?: number;
  visible?: boolean;
  highlighted?: boolean;
  related?: boolean;
  faded?: boolean;
  transferGraphAttrs?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  transferVisible?: boolean;
  configProps?: Record<string, any>;
}

export interface PopoverContainerEvents {
  "item.mouse.enter": CustomEvent<any>;
  "item.mouse.leave": CustomEvent<any>;
  "visible.change": CustomEvent<void>;
}

export interface PopoverContainerEventsMap {
  onItemMouseEnter: "item.mouse.enter";
  onItemMouseLeave: "item.mouse.leave";
  onVisibleChange: "visible.change";
}

export declare class PopoverContainerElement extends HTMLElement {
  data: any | undefined;
  displayBrick:
    | {
        useBrick: UseBrickConf;
        data?: any;
      }
    | undefined;
  popoverTitleBrick:
    | {
        useBrick: UseBrickConf;
      }
    | undefined;
  align: AlignType | undefined;
  popoverBrick:
    | {
        useBrick: UseBrickConf;
        data?: any;
      }
    | undefined;
  popoverIcon: MenuIcon | undefined;
  placement: TooltipPlacement | undefined;
  trigger: ActionType | ActionType[] | undefined;
  triggerByIcon: boolean | undefined;
  showPopoverBg: boolean | undefined;
  popoverContentStyle: Record<string, any> | undefined;
  showIcon: "always" | "never" | "hover" | undefined;
  zIndex: number | undefined;
  visible: boolean | undefined;
  highlighted: boolean | undefined;
  related: boolean | undefined;
  faded: boolean | undefined;
  transferGraphAttrs: boolean | undefined;
  getPopupContainer: (triggerNode: HTMLElement) => HTMLElement | undefined;
  transferVisible: boolean | undefined;
  configProps: Record<string, any> | undefined;
}
