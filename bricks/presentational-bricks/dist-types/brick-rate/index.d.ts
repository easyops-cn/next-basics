export interface BrickRateProps {
  count?: number;
  defaultValue?: number;
  value?: number;
  disabled?: boolean;
  allowHalf?: boolean;
  colors?: any[];
  type?: string;
  rateStyle?: Record<string, any>;
  rateIcon?: any;
  tooltips?: string[];
}

export interface BrickRateEvents {
  "rate.change": CustomEvent<Record<number, any>>;
}

export interface BrickRateEventsMap {
  onRateChange: "rate.change";
}

export declare class BrickRateElement extends HTMLElement {
  count: number | undefined;
  defaultValue: number | undefined;
  value: number | undefined;
  disabled: boolean | undefined;
  allowHalf: boolean | undefined;
  colors: any[] | undefined;
  type: string | undefined;
  rateStyle: Record<string, any> | undefined;
  rateIcon: any | undefined;
  tooltips: string[] | undefined;
}
