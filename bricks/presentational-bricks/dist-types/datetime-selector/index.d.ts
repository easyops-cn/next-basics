import type { RangeText } from "@next-libs/datetime-components";
import type { ButtonSize } from "antd/lib/button";

export type TooltipPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

export type ResolutionProps = "ms" | "s";

export interface DatetimeSelectorProps {
  from?: string;
  to?: string;
  shouldUpdateUrlParams?: boolean;
  type?: string;
  customTimeRange?: RangeText[];
  placement?: TooltipPlacement;
  resolution?: ResolutionProps;
  size?: ButtonSize;
  selectNearDays?: number;
  format?: string;
  rangeDays?: number;
}

export interface DatetimeSelectorEvents {
  "datetime.selected": CustomEvent<
    | { type: "dateRange"; value: "now/d" }
    | { type: "specifiedDate"; value: { from: number; to: number } }
  >;
  "datetime.selected.v2": CustomEvent<{ from: number; to: number }>;
  "datetime.selected.v3": CustomEvent<
    { from: number; to: number } | { from: string }
  >;
}

export interface DatetimeSelectorEventsMap {
  onDatetimeSelected: "datetime.selected";
  onDatetimeSelectedV2: "datetime.selected.v2";
  onDatetimeSelectedV3: "datetime.selected.v3";
}

export declare class DatetimeSelectorElement extends HTMLElement {
  from: string | undefined;
  to: string | undefined;
  shouldUpdateUrlParams: boolean | undefined;
  type: string | undefined;
  customTimeRange: RangeText[] | undefined;
  placement: TooltipPlacement | undefined;
  resolution: ResolutionProps | undefined;
  size: ButtonSize | undefined;
  selectNearDays: number | undefined;
  format: string | undefined;
  rangeDays: number | undefined;
}
