import React from "react";
import {
  humanizeTime,
  HumanizeTimeFormat,
  costTime,
} from "@next-libs/datetime";
import { BrickLink } from "../brick-link/BrickLink";
import moment from "moment";
import { isNil } from "lodash";

interface BrickHumanizeTimeProps {
  value: number | string;
  isMicrosecond?: boolean;
  formatter?: HumanizeTimeFormat;
  isCostTime?: boolean;
  inputFormat?: string;
  outputFormat?: string;
  link?: {
    url: string;
    target?: string;
  };
}

export function BrickHumanizeTime(
  props: BrickHumanizeTimeProps
): React.ReactElement {
  const {
    value,
    isMicrosecond,
    inputFormat,
    outputFormat,
    isCostTime,
    formatter,
    link,
  } = props;

  if (isNil(value)) {
    return <span>-</span>;
  }

  let ts;
  if (typeof value === "number") {
    ts = isMicrosecond ? value : Number(value) * 1000;
  } else {
    const time = moment(value, inputFormat);
    ts = time.unix() * 1000;
  }

  let label: string;
  if (outputFormat) {
    label = moment(ts).format(outputFormat);
  } else {
    label = isCostTime
      ? costTime(ts)
      : humanizeTime(ts, HumanizeTimeFormat[formatter]);
  }

  if (link) {
    return <BrickLink url={link.url} target={link.target} label={label} />;
  }

  return <span>{label}</span>;
}
