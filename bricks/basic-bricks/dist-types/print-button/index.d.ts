export interface PrintButtonProps {
  prefixTitle?: string;
  right?: string;
  bottom?: string;
  color?: string;
  border?: string;
  backgroundColor?: string;
}

export declare class PrintButtonElement extends HTMLElement {
  prefixTitle: string | undefined;
  right: string | undefined;
  bottom: string | undefined;
  color: string | undefined;
  border: string | undefined;
  backgroundColor: string | undefined;
}
