import React from "react";
import { TooltipPlacement } from "antd/lib/tooltip";

import {
  DatetimeRange,
  DateRange,
  SpecifiedDateRange,
  RangeText,
  RangeType,
  defaultRangeOptionList,
} from "@next-libs/datetime-components";
import { processResolution, convertToSecond } from "./processor";
import { ButtonSize } from "antd/lib/button";

export type ResolutionProps = "ms" | "s";
type DateRangeProps = SpecifiedDateRange | DateRange;

export interface DatetimeSelectorProps {
  from?: string;
  to?: string;
  datetimeSelected?: (dateRange: any) => void;
  type?: RangeType;
  customTimeRange?: RangeText[];
  placement?: TooltipPlacement;
  resolution?: ResolutionProps;
  size?: ButtonSize;
}

export function DatetimeSelector(
  props: DatetimeSelectorProps
): React.ReactElement {
  const { customTimeRange = [], type = "default", resolution, size } = props;

  const getInitDateRange = (): DateRangeProps => {
    const rangeList =
      type === "default"
        ? defaultRangeOptionList.map((item) => item.range)
        : customTimeRange.map((item) => item.range);
    if (props.from) {
      return rangeList.includes(props.from)
        ? {
            type: "dateRange",
            value: props.from,
          }
        : processResolution(
            {
              type: "specifiedDate",
              value: {
                from: +props.from,
                to: +props.to,
              },
            },
            resolution,
            {
              s: (value) => value * 1000,
            }
          );
    } else {
      return null;
    }
  };

  const handleConfirm = (dateRange: DateRangeProps): void => {
    const range = processResolution(dateRange, resolution, {
      s: (value) => convertToSecond(value),
    });
    props?.datetimeSelected(range);
  };

  return (
    <DatetimeRange
      type={type}
      customTimeRange={customTimeRange}
      onConfirm={handleConfirm}
      initDateRange={getInitDateRange()}
      placement={props.placement}
      size={size}
    />
  );
}
