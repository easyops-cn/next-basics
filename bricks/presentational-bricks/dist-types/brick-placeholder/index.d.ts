export interface BrickPlaceholderProps {
  showCard?: boolean;
  bordered?: boolean;
  gridRow?: string;
  gridColumn?: string;
  text?: string;
}

export declare class BrickPlaceholderElement extends HTMLElement {
  showCard: boolean | undefined;
  bordered: boolean | undefined;
  gridRow: string | undefined;
  gridColumn: string | undefined;
  text: string | undefined;
}
