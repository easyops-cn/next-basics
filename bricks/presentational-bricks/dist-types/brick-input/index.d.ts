export interface BrickInputProps {
  placeholder?: string;
  trigger?: "change" | "enter";
  value?: string;
  debounceTime?: number;
  defaultValKey?: string;
}

export interface BrickInputEvents {
  "input.emit": CustomEvent<Record<string, any>>;
  "input.change": CustomEvent<Record<string, any>>;
}

export interface BrickInputEventsMap {
  onInputEmit: "input.emit";
  onInputChange: "input.change";
}

export declare class BrickInputElement extends HTMLElement {
  placeholder: string | undefined;
  trigger: "change" | "enter" | undefined;
  value: string | undefined;
  debounceTime: number | undefined;
  defaultValKey: string | undefined;
}
