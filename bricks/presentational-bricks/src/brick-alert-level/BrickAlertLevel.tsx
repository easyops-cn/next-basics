import React from "react";

import {
  BrickValueMapping,
  MappingValue,
  Color,
} from "../brick-value-mapping/BrickValueMapping";
import { AlertLevel } from "./index";

const mapping: { [key: string]: MappingValue } = {
  0: {
    text: "通知",
    color: Color.blue,
  },
  1: {
    text: "警告",
    color: Color.orange,
  },
  2: {
    text: "紧急",
    color: Color.red,
  },
  info: {
    text: "通知",
    color: Color.blue,
  },
  warning: {
    text: "警告",
    color: Color.orange,
  },
  critical: {
    text: "紧急",
    color: Color.red,
  },
};

interface BrickAlertLevelProps {
  value: AlertLevel;
}

export function BrickAlertLevel(
  props: BrickAlertLevelProps
): React.ReactElement {
  return (
    <BrickValueMapping
      value={props.value}
      mapping={mapping}
    ></BrickValueMapping>
  );
}
