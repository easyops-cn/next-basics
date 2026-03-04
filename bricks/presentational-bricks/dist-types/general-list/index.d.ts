export interface GeneralListProps {
  isCardList?: boolean;
  showCard?: boolean;
  cardWidth?: string;
  cardMinWidth?: string;
}

export declare class GeneralListElement extends HTMLElement {
  isCardList: boolean | undefined;
  showCard: boolean | undefined;
  cardWidth: string | undefined;
  cardMinWidth: string | undefined;
}
