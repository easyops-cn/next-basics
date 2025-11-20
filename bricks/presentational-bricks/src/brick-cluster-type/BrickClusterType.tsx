import React from "react";
import i18next from "i18next";

import {
  BrickValueMapping,
  Color,
  MappingValue,
} from "../brick-value-mapping/BrickValueMapping";
import { NS_PRESENTATIONAL_BRICKS } from "../i18n/constants";
import { K } from "../i18n/constants";

const mapping: { [key: string]: MappingValue } = {
  "-1": {
    text: i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.CLUSTER_TYPE_NONE}`, "无"),
    color: Color.gray,
  },
  "0": {
    text: i18next.t(
      `${NS_PRESENTATIONAL_BRICKS}:${K.CLUSTER_TYPE_DEVELOPMENT}`,
      "开发"
    ),
    color: Color.purple,
  },
  "1": {
    text: i18next.t(
      `${NS_PRESENTATIONAL_BRICKS}:${K.CLUSTER_TYPE_TEST}`,
      "测试"
    ),
    color: Color.green,
  },
  "2": {
    text: i18next.t(
      `${NS_PRESENTATIONAL_BRICKS}:${K.CLUSTER_TYPE_PRODUCTION}`,
      "生产"
    ),
    color: Color.blue,
  },
  "3": {
    text: i18next.t(
      `${NS_PRESENTATIONAL_BRICKS}:${K.CLUSTER_TYPE_PRE_RELEASE}`,
      "预发布"
    ),
    color: Color.cyan,
  },
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
