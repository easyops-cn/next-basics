export interface BrickUtilsProps {
  messages?: { success: string; error: string };
}

export declare class BrickUtilsElement extends HTMLElement {
  messages: { success: string; error: string } | undefined;
  copy(text: string): void;
  copyTargetProperty(target: string, property: string): void;
}
