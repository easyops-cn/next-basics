import React from "react";
import type React from "react";

export interface MicroAppProps {
  pageTitle?: string;
  bannerPageTitle?: string;
  overflowXAuto?: boolean;
  noGap?: boolean;
  dashboardMode?: boolean;
  pageTitleScale?: number;
  hideToolbar?: boolean;
  bannerStyle?: React.CSSProperties;
  hideLogo?: boolean;
  hideExitBtn?: boolean;
  hasSubMenu?: boolean;
  hasTitleBar?: boolean;
  hasToolbar?: boolean;
  hasBanner?: boolean;
  hasBannerTitleBar?: boolean;
  hasBannerToolbar?: boolean;
}

export interface MicroAppEvents {
  "mode.dashboard.exit": CustomEvent<void>;
}

export interface MicroAppEventsMap {
  onModeDashboardExit: "mode.dashboard.exit";
}

export declare class MicroAppElement extends HTMLElement {
  pageTitle: string | undefined;
  bannerPageTitle: string | undefined;
  overflowXAuto: boolean | undefined;
  noGap: boolean | undefined;
  dashboardMode: boolean | undefined;
  pageTitleScale: number | undefined;
  hideToolbar: boolean | undefined;
  bannerStyle: React.CSSProperties | undefined;
  hideLogo: boolean | undefined;
  hideExitBtn: boolean | undefined;
  hasSubMenu: boolean | undefined;
  hasTitleBar: boolean | undefined;
  hasToolbar: boolean | undefined;
  hasBanner: boolean | undefined;
  hasBannerTitleBar: boolean | undefined;
  hasBannerToolbar: boolean | undefined;
}
