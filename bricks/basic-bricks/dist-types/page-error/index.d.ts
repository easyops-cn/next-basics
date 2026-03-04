export interface PageErrorProps {
  error?: string;
  code?: number;
}

export declare class PageErrorElement extends HTMLElement {
  error: string | undefined;
  code: number | undefined;
}
