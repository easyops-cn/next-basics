export interface BrickCodeDisplayProps {
  language?: string;
  showLineNumber?: boolean;
  value?: string;
  field?: string;
  dataSource?: any;
}

export declare class BrickCodeDisplayElement extends HTMLElement {
  language: string | undefined;
  showLineNumber: boolean | undefined;
  value: string | undefined;
  field: string | undefined;
  dataSource: any | undefined;
}
