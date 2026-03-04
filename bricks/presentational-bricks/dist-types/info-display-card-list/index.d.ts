import React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";
import type { MenuIcon } from "@next-core/brick-types";

export interface CardItem {
  title: string;
  desc: string;
  icon?: MenuIcon;
  detail?: CardDetail[];
  operateItemBrick?: { useBrick: UseBrickConf };
}

export interface CardDetail {
  title: string;
  desc: string;
  width?: string | number;
  useBrick?: boolean;
  detailBrickConf?: { useBrick: UseBrickConf };
}

export interface InfoDisplayCardListProps {
  dataSource?: CardItem[];
  urlTemplate?: string;
  url?: string;
  target?: string;
  showIcon?: boolean;
  optionConf?: { useBrick: UseBrickConf };
  titleBrickConf?: { useBrick: UseBrickConf };
  iconBrickConf?: { useBrick: UseBrickConf };
  detailOfDescBrickConf?: { useBrick: UseBrickConf };
  titleFontSize?: number | string;
  detailDescFontSize?: number | string;
  listStyle?: React.CSSProperties;
}

export declare class InfoDisplayCardListElement extends HTMLElement {
  dataSource: CardItem[] | undefined;
  urlTemplate: string | undefined;
  url: string | undefined;
  target: string | undefined;
  showIcon: boolean | undefined;
  optionConf: { useBrick: UseBrickConf } | undefined;
  titleBrickConf: { useBrick: UseBrickConf } | undefined;
  iconBrickConf: { useBrick: UseBrickConf } | undefined;
  detailOfDescBrickConf: { useBrick: UseBrickConf } | undefined;
  titleFontSize: number | string | undefined;
  detailDescFontSize: number | string | undefined;
  listStyle: React.CSSProperties | undefined;
}
