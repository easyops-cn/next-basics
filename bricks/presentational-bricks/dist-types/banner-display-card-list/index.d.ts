import type { UseBrickConf } from "@next-core/brick-types";

export interface CardItem {
  title?: string;
  content?: string;
  optionConf?: { useBrick: UseBrickConf };
  green?: boolean;
}

export interface BannerDisplayCardListProps {
  cardList?: CardItem[];
}

export declare class BannerDisplayCardListElement extends HTMLElement {
  cardList: CardItem[] | undefined;
}
