export interface CopyableTextProps {
  text?: string;
  tooltips?: string;
  hiddenText?: boolean;
  type?: "custom" | "input" | "text";
  dataSource?: Record<string, any>;
  suffixCount?: number;
}

export interface CopyableTextEvents {
  "text.click": CustomEvent<any>;
}

export interface CopyableTextEventsMap {
  onTextClick: "text.click";
}

export declare class CopyableTextElement extends HTMLElement {
  text: string | undefined;
  tooltips: string | undefined;
  hiddenText: boolean | undefined;
  type: "custom" | "input" | "text" | undefined;
  dataSource: Record<string, any> | undefined;
  suffixCount: number | undefined;
}
