export interface TextCollapseProps {
  text?: string;
  line?: number;
}

export declare class TextCollapseElement extends HTMLElement {
  text: string | undefined;
  line: number | undefined;
}
