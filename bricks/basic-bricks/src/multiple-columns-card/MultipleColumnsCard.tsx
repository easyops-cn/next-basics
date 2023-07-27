import React from "react";
import { Card } from "antd";

export interface MultipleColumnsCardProps {
  cardBorder: boolean;
  gridColumns: string | Array<string | number>;
}

export function transformCss(
  gridColumns: MultipleColumnsCardProps["gridColumns"]
) {
  const defaultValue = "1fr";
  const arr = Array.isArray(gridColumns) ? gridColumns : [gridColumns];

  const columns = arr.reduce((str, value) => {
    if (typeof value === "string") {
      str += `${value} `;
    } else if (typeof value === "number") {
      str += `${value}fr `;
    }
    return str;
  }, "");

  return columns || defaultValue;
}

export function MultipleColumnsCard({
  cardBorder,
  gridColumns
}: MultipleColumnsCardProps): React.ReactElement {
  return (
    <Card bordered={cardBorder}>
      <div
        className="multiple-columns-container"
        style={{
          gridTemplateColumns: transformCss(gridColumns)
        }}
      >
        <slot id="contentSlot" name="content" />
      </div>
    </Card>
  );
}
