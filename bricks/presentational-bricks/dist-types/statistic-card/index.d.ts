import type { MenuIcon } from "@next-core/brick-types";

export interface StatisticCardProps {
  cardTitle?: string;
  value?: string | number;
  icon?: MenuIcon | string;
  url?: string;
  tip?: string;
  disabled?: boolean;
  showCard?: boolean;
  dataSource?: Record<string, any>;
  fields?: {
    icon?: string;
    disabled?: string;
    tip?: string;
    url?: string;
    cardTitle?: string;
    value?: string;
  };
  urlTemplate?: string;
  iconType?: string;
}

export declare class StatisticCardElement extends HTMLElement {
  cardTitle: string | undefined;
  value: string | number | undefined;
  icon: MenuIcon | string | undefined;
  url: string | undefined;
  tip: string | undefined;
  disabled: boolean | undefined;
  showCard: boolean | undefined;
  dataSource: Record<string, any> | undefined;
  fields:
    | {
        icon?: string;
        disabled?: string;
        tip?: string;
        url?: string;
        cardTitle?: string;
        value?: string;
      }
    | undefined;
  urlTemplate: string | undefined;
  iconType: string | undefined;
}
