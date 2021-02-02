import React from "react";
import { costTime } from "@next-libs/datetime";

interface CostTimeProps {
  startTime?: string | number;
  endTime?: string | number;
  cost?: number;
}

export function CostTime({
  cost,
  startTime,
  endTime,
}: CostTimeProps): React.ReactElement {
  return <span>{costTime(cost, startTime, endTime)}</span>;
}
