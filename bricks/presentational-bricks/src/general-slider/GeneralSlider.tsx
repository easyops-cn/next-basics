import React from "react";
import { Slider } from "antd";
import { SliderMarks } from "antd/lib/slider";
import style from "./GeneralSlider.module.css";
import classNames from "classnames";
export type UiType = "default" | "dashboard";
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
  uiType?: UiType;
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
    uiType,
    onChange,
    onAfterChange,
  } = props;
  return (
    <div className={uiType === "dashboard" ? style.dashboardSlider : ""}>
      <Slider
        className={classNames({
          [style.onlyShowMode]: onlyShowMode,
          [style.bigMode]: size === "large",
        })}
        value={value}
        defaultValue={value}
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
    </div>
  );
}
