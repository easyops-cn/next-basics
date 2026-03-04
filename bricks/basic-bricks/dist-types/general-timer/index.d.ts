export interface GeneralTimerProps {
  eventName?: string;
  interval?: number;
  isInterval?: boolean;
  dataSource?: any;
}

export interface GeneralTimerEvents {
  "time.change": CustomEvent<void>;
}

export interface GeneralTimerEventsMap {
  onTimeChange: "time.change";
}

export declare class GeneralTimerElement extends HTMLElement {
  eventName: string | undefined;
  interval: number | undefined;
  isInterval: boolean | undefined;
  dataSource: any | undefined;
  stopTimer(): void;
  reStartTimer(): void;
}
