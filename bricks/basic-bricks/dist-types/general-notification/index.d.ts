import type { NotificationPlacement } from "antd/lib/notification";
import type { NotificationApi } from "antd/es/notification";
import type { MenuIcon } from "@next-core/brick-types";
import type React from "react";
import type { UseBrickConf } from "@next-core/brick-types";

export interface DescriptionBrickprops {
  useBrick: UseBrickConf;
}

export interface BtnBrickprops {
  useBrick: UseBrickConf;
}

export interface GeneralNotificationProps {
  message?: string;
  description?: string;
  descriptionBrick?: DescriptionBrickprops;
  btnBrick?: BtnBrickprops;
  key?: string;
  icon?: MenuIcon | string;
  placement?: NotificationPlacement;
  duration?: number;
  iconStyle?: CSSProperties;
}

export interface GeneralNotificationEvents {
  "general.notification.click": CustomEvent<Record<string, any>>;
  "general.notification.close": CustomEvent<Record<string, any>>;
}

export interface GeneralNotificationEventsMap {
  onGeneralNotificationClick: "general.notification.click";
  onGeneralNotificationClose: "general.notification.close";
}

export declare class GeneralNotificationElement extends HTMLElement {
  message: string | undefined;
  description: string | undefined;
  descriptionBrick: DescriptionBrickprops | undefined;
  btnBrick: BtnBrickprops | undefined;
  key: string | undefined;
  icon: MenuIcon | string | undefined;
  placement: NotificationPlacement | undefined;
  duration: number | undefined;
  iconStyle: CSSProperties | undefined;
  open(
    mtd: keyof Omit<NotificationApi, "config" | "close" | "destroy">,
    key?: string
  ): void;
}
