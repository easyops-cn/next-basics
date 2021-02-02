import React from "react";
import { humanizeTime, HumanizeTimeFormat, costTime } from "@next-libs/datetime";
import { BrickLink } from "../brick-link/BrickLink";
import moment from "moment";

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
  let value;
  if (typeof props.value === "number") {
    value = props.isMicrosecond ? props.value : Number(props.value) * 1000;
  } else {
    const time = moment(props.value, props.inputFormat);
    value = time.unix() * 1000;
  }

  let label: string;
  if (props.outputFormat) {
    label = moment(value).format(props.outputFormat);
  } else {
    label = props.isCostTime
      ? costTime(value)
      : value
      ? humanizeTime(value, HumanizeTimeFormat[props.formatter])
      : "-";
  }

  if (props.link) {
    return (
      <BrickLink
        url={props.link.url}
        target={props.link.target}
        label={label}
      />
    );
  }

  return <span>{label}</span>;
}
