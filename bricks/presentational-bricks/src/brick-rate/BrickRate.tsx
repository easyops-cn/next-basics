import React, { useEffect, useRef } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { RateProps } from "antd/lib/rate";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
export interface BrickRateProps extends RateProps {
  count?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  disabled?: boolean;
  type?: string;
  rateStyle?: any;
  rateIcon?: MenuIcon;
  colors?: any[];
}

export function BrickRate(props: BrickRateProps): React.ReactElement {
  const { count, defaultValue, allowHalf, disabled, rateStyle } = props;
  const rateRef = useRef();
  const defaultIcon = <>{props.type ? props.type : <StarOutlined />}</>;
  const icon = (
    <>
      {props.rateIcon ? (
        <GeneralIcon icon={props.rateIcon}></GeneralIcon>
      ) : (
        defaultIcon
      )}
    </>
  );
  const handleChange = (value: number): void => {
    props.onChange?.(value);
  };
  useEffect(() => {
    if (props.colors && props.colors.length > 0 && disabled) {
      const colors = props.colors;
      const parentNodes = rateRef.current.rate;
      if (parentNodes) {
        const childNodes = parentNodes.childNodes;
        childNodes.forEach((child: any, index: number) => {
          if (index <= props.colors.length - 1) {
            child.style.color = colors[index];
          }
        });
      }
    }
  });
  return (
    <Rate
      ref={rateRef}
      onChange={handleChange}
      disabled={disabled}
      count={count}
      character={icon}
      defaultValue={defaultValue}
      allowHalf={allowHalf}
      style={rateStyle}
    ></Rate>
  );
}
