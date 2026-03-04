import type { DrawerProps } from "antd/lib/drawer";

export interface ICustomSwitchConfig {
  openText?: string;
  openIcon?: any;
  closeText?: string;
  closeIcon?: any;
  top?: string;
}

export interface OpenCloseOption {
  noEvent?: boolean;
}

export interface GeneralDrawerProps {
  customTitle?: string;
  maskClosable?: boolean;
  width?: number | string;
  closable?: boolean;
  hasFooter?: boolean;
  loading?: boolean;
  mask?: boolean;
  bodyStyle?: Record<string, any>;
  drawerStyle?: Record<string, any>;
  headerStyle?: Record<string, any>;
  isFloat?: boolean;
  configProps?: DrawerProps;
  scrollToTopWhenOpen?: boolean;
  stackable?: boolean;
}

export interface GeneralDrawerEvents {
  "general.drawer.open": CustomEvent<Record<string, any>>;
  "general.drawer.close": CustomEvent<Record<string, any>>;
}

export interface GeneralDrawerEventsMap {
  onGeneralDrawerOpen: "general.drawer.open";
  onGeneralDrawerClose: "general.drawer.close";
}

export declare class GeneralDrawerElement extends HTMLElement {
  customTitle: string | undefined;
  maskClosable: boolean | undefined;
  width: number | string | undefined;
  closable: boolean | undefined;
  hasFooter: boolean | undefined;
  loading: boolean | undefined;
  mask: boolean | undefined;
  bodyStyle: Record<string, any> | undefined;
  drawerStyle: Record<string, any> | undefined;
  headerStyle: Record<string, any> | undefined;
  isFloat: boolean | undefined;
  configProps: DrawerProps | undefined;
  scrollToTopWhenOpen: boolean | undefined;
  stackable: boolean | undefined;
  open(option?: OpenCloseOption): void;
  bodyScroll(top: number): void;
  close(option?: OpenCloseOption): void;
}
