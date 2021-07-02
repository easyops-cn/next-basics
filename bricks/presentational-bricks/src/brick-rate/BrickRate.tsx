import React, { useEffect, useRef, useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { RateProps } from "antd/lib/rate";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
export interface BrickRateProps extends RateProps {
  onChange?: (value: number) => void;
  type?: string;
  rateStyle?: any;
  rateIcon?: MenuIcon;
  colors?: any[];
}
export function BrickRate(props: BrickRateProps): React.ReactElement {
  const { rateStyle, ...resProps } = props;
  const rateRef = useRef();
  const [value, setValue] = useState<number>();
  const defaultIcon = <>{props.type ? props.type : <StarOutlined />}</>;
  const icon = (
    <>{props.rateIcon ? <GeneralIcon icon={props.rateIcon} /> : defaultIcon}</>
  );
  const handleChange = (value: number): void => {
    setValue(value);
    props.onChange?.(value);
  };
  useEffect(() => {
    if (props.colors && props.colors.length > 0) {
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
  }, [props.colors]);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <Rate
      {...resProps}
      ref={rateRef}
      onChange={handleChange}
      character={icon}
      style={rateStyle}
      value={value}
    />
  );
}
