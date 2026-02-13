import React from "react";
import { useTranslation } from "react-i18next";
import { merge } from "lodash";

import { DataType, isConditionSatisfied, ConditionType } from "@next-libs/cmdb-utils";
import cssStyle from "./style.module.css";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

export type DisplayType = "label" | "default";

export interface RuleProps {
  condition: ConditionType;
  style?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
  label?: string;
}

export interface BrickConditionalDisplayProps {
  data: DataType;
  value: number | string;
  rules: RuleProps[];
  type: DisplayType;
}

export function BrickConditionalDisplay(
  props: BrickConditionalDisplayProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  const renderDisplay = (
    data: DataType,
    value: number | string,
    rules: RuleProps[]
  ) => {
    if (data === null) {
      return <span className={cssStyle.error}>{t(K.DATASOURCE_EMPTY_ERROR)}</span>;
    } else {
      let display = <div className={cssStyle[props.type]}>{value}</div>;
      rules.forEach((rule) => {
        if (isConditionSatisfied(data, rule.condition)) {
          const style = merge(
            {
              backgroundColor: "rgba(47, 194, 91, 1)",
              color: "rgba(255, 255, 255, 1)",
              borderColor: "rgba(47, 194, 91, 1)",
            },
            rule.style
          );

          display = (
            <div
              className={cssStyle[props.type]}
              style={{
                borderColor: style.borderColor,
                background: style.backgroundColor,
                color: style.color,
              }}
            >
              {rule.label || value}
            </div>
          );
        }
      });
      return display;
    }
  };

  return renderDisplay(props.data, props.value, props.rules);
}
