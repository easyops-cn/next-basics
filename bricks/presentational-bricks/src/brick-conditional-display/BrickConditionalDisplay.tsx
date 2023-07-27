import React from "react";
import { merge } from "lodash";

import { DataType, isConditionSatisfied } from "@next-libs/cmdb-utils";
import { RuleProps } from "./index";
import cssStyle from "./style.module.css";

export type DisplayType = "label" | "default";

export interface BrickConditionalDisplayProps {
  data: DataType;
  value: number | string;
  rules: RuleProps[];
  type: DisplayType;
}

export function BrickConditionalDisplay(
  props: BrickConditionalDisplayProps
): React.ReactElement {
  const renderDisplay = (
    data: DataType,
    value: number | string,
    rules: RuleProps[]
  ) => {
    if (data === null) {
      return <span className={cssStyle.error}>参数“dataSource”为空</span>;
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
