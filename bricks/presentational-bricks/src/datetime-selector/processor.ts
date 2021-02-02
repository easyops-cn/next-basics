import {
  DateRange,
  SpecifiedDateRange,
  SpecifiedDateValue,
  parseDatetimeRange,
} from "@next-libs/datetime-components";
import { ResolutionProps } from "./DatetimeSelector";

export type TimeRange = DateRange | SpecifiedDateRange;

export function transformToTimestamp(
  range: TimeRange,
  resolution?: ResolutionProps
) {
  if (range.type === "specifiedDate")
    return { from: range.value.from, to: range.value.to };

  const formatRange = processResolution(
    {
      value: parseDatetimeRange(range.value) as SpecifiedDateValue,
      type: "specifiedDate",
    },
    resolution,
    { s: (value) => convertToSecond(value) }
  ) as SpecifiedDateRange;

  return { from: formatRange.value.from, to: formatRange.value.to };
}

export function formatTimeRange(range: TimeRange) {
  if (range.type === "specifiedDate")
    return { from: range.value.from, to: range.value.to };
  return {
    from: range.value,
  };
}

export function processResolution(
  range: TimeRange,
  resolution: ResolutionProps,
  transformMap: Record<string, (value: number) => any>
): TimeRange {
  if (range.type === "specifiedDate") {
    return {
      ...range,
      value: {
        from: transformMap[resolution]?.(range.value.from) || range.value.from,
        to: transformMap[resolution]?.(range.value.to) || range.value.to,
      },
    };
  }

  return range;
}

export function convertToSecond(value: number): number {
  return Math.floor(value / 1000);
}
