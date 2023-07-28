import React from "react";
import { Slider } from "antd";
import { SliderMarks } from "antd/lib/slider";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import style from "./GeneralSlide.module.css";
import { omit } from "lodash";
import classNames from "classnames";
import { UiType } from "../interfaces";
export interface GeneralSlideProps extends FormItemWrapperProps {
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
  tooltipVisible?: boolean;
  uiType?: UiType;
  tipFormatter?: (value?: number) => React.ReactNode;
}

export function GeneralSlide(props: GeneralSlideProps): React.ReactElement {
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
    tooltipVisible,
    tipFormatter,
  } = props;

  return (
    <div className={uiType === "dashboard" ? style.dashboardSlider : ""}>
      <FormItemWrapper {...omit(props, ["min", "max"])}>
        <Slider
          className={classNames({
            [style.onlyShowMode]: onlyShowMode,
            [style.bigMode]: size === "large",
          })}
          value={props.name && props.formElement ? undefined : value}
          disabled={disabled || onlyShowMode}
          dots={dots}
          max={max}
          min={min}
          range={range}
          marks={marks}
          step={step}
          included={included}
          onChange={props.onChange}
          onAfterChange={props.onAfterChange}
          tipFormatter={tipFormatter}
          tooltipVisible={tooltipVisible}
        />
      </FormItemWrapper>
    </div>
  );
}
