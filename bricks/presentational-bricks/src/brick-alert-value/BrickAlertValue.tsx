import React from "react";
import { get, find } from "lodash";

import { MonitorModels } from "@sdk/monitor-sdk";

interface BrickAlertValueProps {
  alertEvent: MonitorModels.ModelAlertEvent;
}

function computeAlertValue(alertEvent: MonitorModels.ModelAlertEvent): string {
  const unit = get(alertEvent, "alert_conditions.unit", "");
  const comparator = get(
    find(get(alertEvent, "alert_conditions.comparators", []), {
      level: alertEvent.level
    }),
    "type"
  );

  const compareMapping: any = {
    bigger_than: "↑",
    smaller_than: "↓"
  };
  const map: string = compareMapping[comparator]
    ? compareMapping[comparator]
    : "";

  if (typeof alertEvent.value !== "number") {
    return alertEvent.value;
  }

  return (
    (Number.isInteger(alertEvent.value)
      ? alertEvent.value
      : alertEvent.value.toFixed(2)) +
    unit +
    " " +
    map
  );
}

export function BrickAlertValue(
  props: BrickAlertValueProps
): React.ReactElement {
  const alertValue = computeAlertValue(props.alertEvent);

  return <span>{alertValue}</span>;
}
