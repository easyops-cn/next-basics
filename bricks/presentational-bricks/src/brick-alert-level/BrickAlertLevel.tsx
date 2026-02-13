import React from "react";

import {
  BrickValueMapping,
  MappingValue,
  Color,
} from "../brick-value-mapping/BrickValueMapping";
import { AlertLevel } from "./index";
import { t } from "../i18n";
import { K } from "../i18n/constants";

const mapping: { [key: string]: MappingValue } = {
  0: {
    text: t(K.NOTICE),
    color: Color.blue,
  },
  1: {
    text: t(K.WARNING),
    color: Color.orange,
  },
  2: {
    text: t(K.URGENT),
    color: Color.red,
  },
  info: {
    text: t(K.NOTICE),
    color: Color.blue,
  },
  warning: {
    text: t(K.WARNING),
    color: Color.orange,
  },
  critical: {
    text: t(K.URGENT),
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
