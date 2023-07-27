import React from "react";

import {
  BrickValueMapping,
  Color,
  MappingValue
} from "../brick-value-mapping/BrickValueMapping";

const mapping: { [key: string]: MappingValue } = {
  "-1": {
    text: "无",
    color: Color.gray
  },
  "0": {
    text: "开发",
    color: Color.purple
  },
  "1": {
    text: "测试",
    color: Color.green
  },
  "2": {
    text: "生产",
    color: Color.blue
  },
  "3": {
    text: "预发布",
    color: Color.cyan
  }
};

interface BrickClusterTypeProps {
  objectId?: string;
  value: "-1" | "0" | "1" | "2" | "3";
  showBg?: boolean;
}

export function BrickClusterType(
  props: BrickClusterTypeProps
): React.ReactElement {
  if (!props.objectId || props.objectId === "CLUSTER") {
    return (
      <BrickValueMapping
        value={props.value}
        mapping={mapping}
        showBg={props.showBg}
      />
    );
  } else {
    return <div>{props.value}</div>;
  }
}
