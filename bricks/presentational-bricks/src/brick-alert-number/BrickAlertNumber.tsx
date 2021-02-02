import React from "react";
import {
  RuleProps,
  BrickConditionalDisplay,
} from "../brick-conditional-display/BrickConditionalDisplay";

interface BrickAlertNumberProps {
  alertNumber: number;
}

const rules: RuleProps[] = [
  {
    condition: { $eq: 0 },
    style: {
      backgroundColor: "var(--bg-color-button-success)",
      color: "white",
    },
  },
  {
    condition: { $gte: 1 },
    style: {
      backgroundColor: "var(--bg-color-button-warning)",
      color: "white",
    },
  },
];

export function BrickAlertNumber(
  props: BrickAlertNumberProps
): React.ReactElement {
  return (
    <BrickConditionalDisplay
      data={props.alertNumber}
      value={props.alertNumber}
      rules={rules}
      type={null}
    />
  );
}
