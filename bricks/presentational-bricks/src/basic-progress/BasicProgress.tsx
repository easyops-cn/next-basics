import React, { useEffect, useState } from "react";
import { Progress } from "antd";

import { ColorObj } from "./index";
import style from "./style.module.css";

interface BasicProgressProps {
  value: number;
  description: string;
  colorMap?: ColorObj[];
  configProps?: Record<string, any>;
  type: "line" | "circle" | "dashboard";
  text: string;
  fontSize: string;
}

export enum Color {
  green = "green",
  red = "red",
  blue = "blue",
  orange = "orange",
  cyan = "cyan",
  purple = "purple",
  geekblue = "geekblue",
  gray = "gray"
}

export function BasicProgress(props: BasicProgressProps): React.ReactElement {
  const [color, setColor] = useState(props.configProps?.strokeColor || "blue");

  useEffect(() => {
    if (props.colorMap) {
      const curObj = props.colorMap.find(item => {
        return +item.progress >= +props.value;
      });
      const color = Object.values(Color).includes(curObj?.color)
        ? curObj.color
        : "";
      setColor(color);
    }
  }, [props.colorMap]);

  const format = percent => {
    return (
      <div className={style.showContainer} style={{ fontSize: props.fontSize }}>
        <span
          style={{ color: `var(--theme-${color}-color)` }}
          className={style.showValue}
        >
          {props.text}
        </span>
        <span className={style.showDescription}>{props.description}</span>
      </div>
    );
  };

  return (
    <div className={style.mainContainer}>
      <Progress
        type={props.type}
        strokeColor={`var(--theme-${color}-color)`}
        percent={props.value}
        format={format}
        {...props.configProps}
      ></Progress>
    </div>
  );
}
