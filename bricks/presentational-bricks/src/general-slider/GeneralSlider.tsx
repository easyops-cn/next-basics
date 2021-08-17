import React from "react";
import { Slider } from "antd";
import { SliderMarks } from "antd/lib/slider";
import style from "./GeneralSlider.module.css";
import classNames from "classnames";

export interface GeneralSliderProps {
  value: any;
  disabled?: boolean;
  dots?: boolean;
  max?: number;
  min?: number;
  range?: boolean;
  marks?: SliderMarks;
  step?: number | null;
  included?: boolean;
  onChange?: (value: any) => void;
  onAfterChange?: (value: any) => void;
  onlyShowMode?: boolean;
  size?: string;
}

export function GeneralSlider(props: GeneralSliderProps): React.ReactElement {
  const {
    value,
    disabled,
    dots,
    max,
    min,
    range,
    marks,
    step,
    included,
    onlyShowMode,
    size,
    onChange,
    onAfterChange,
  } = props;

  return (
    <Slider
      className={classNames({
        [style.onlyShowMode]: onlyShowMode,
        [style.bigMode]: size === "large",
      })}
      value={value}
      disabled={disabled || onlyShowMode}
      dots={dots}
      max={max}
      min={min}
      range={range}
      marks={marks}
      step={step}
      included={included}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  );
}
