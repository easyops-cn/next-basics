import React from "react";
import type { MenuIcon } from "@next-core/brick-types";
import type React from "react";

export interface CollapsibleCardItemProps {
  cardTitle?: string;
  cardDesc?: string;
  hoverable?: boolean;
  cardStyle?: CSSProperties;
  icon?: MenuIcon;
  iconStyle?: Record<string, any>;
  dataSource?: Record<string, any>;
  fields?: {
    cardTitle?: string;
    cardDesc?: string;
    icon?: string;
  };
  isActive?: boolean;
  disableClickHeaderToOpen?: boolean;
  customHeader?: boolean;
  disableClickHeaderToClose?: boolean;
  contentStyle?: Record<string, any>;
  subscriptConfig?: any;
  operatingAreaStyle?: React.CSSProperties;
}

export interface CollapsibleCardItemEvents {
  "collapse.change": CustomEvent<boolean>;
}

export interface CollapsibleCardItemEventsMap {
  onCollapseChange: "collapse.change";
}

export declare class CollapsibleCardItemElement extends HTMLElement {
  cardTitle: string | undefined;
  cardDesc: string | undefined;
  hoverable: boolean | undefined;
  cardStyle: CSSProperties | undefined;
  icon: MenuIcon | undefined;
  iconStyle: Record<string, any> | undefined;
  dataSource: Record<string, any> | undefined;
  fields:
    | {
        cardTitle?: string;
        cardDesc?: string;
        icon?: string;
      }
    | undefined;
  isActive: boolean | undefined;
  disableClickHeaderToOpen: boolean | undefined;
  customHeader: boolean | undefined;
  disableClickHeaderToClose: boolean | undefined;
  contentStyle: Record<string, any> | undefined;
  subscriptConfig: any | undefined;
  operatingAreaStyle: React.CSSProperties | undefined;
  open(): void;
  close(): void;
  toggle(): void;
}
