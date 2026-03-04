export interface HotkeysConfig {
  key: string;
  eventName: string;
}

export interface GeneralHotkeysProps {
  hotkeysConfig?: HotkeysConfig[];
  disabled?: boolean;
}

export declare class GeneralHotkeysElement extends HTMLElement {
  hotkeysConfig: HotkeysConfig[] | undefined;
  disabled: boolean | undefined;
}
