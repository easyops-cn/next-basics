import classNames from "classnames";
import React, { CSSProperties, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import styles from "./DigitalNumber.module.css";

export type DigitalNumberType = "default" | "custom";
export type DigitalNumberProps = {
  decimals?: number;
  decimal?: string;
  cellStyle?: CSSProperties;
  textStyle?: CSSProperties;
  easeSpeed?: number;
  value: number;
  type?: DigitalNumberType;
  height?: number;
  maxLen?: number;
  thousands?: boolean;
  delaySpeed?: number;
  width?: number;
};

const defaultNumberRange = Array(10)
  .fill("")
  .map((_, index) => index.toString());

export function DigitalNumber(props: DigitalNumberProps): React.ReactElement {
  const {
    value,
    decimals,
    decimal,
    maxLen,
    thousands,
    type = "custom",
    ...rest
  } = props;
  const [numArr, setNumArr] = useState<string[]>([]);

  useEffect(() => {
    const fixedVal = decimals ? value.toFixed(decimals) : "" + value;
    const _value = decimal ? fixedVal.replace(/\./, decimal) : fixedVal;
    const splitArr = _value.split(decimal || ".");
    const intNumber =
      maxLen && splitArr[0].length < maxLen
        ? (Array(maxLen).join("0") + splitArr[0]).slice(-maxLen)
        : splitArr[0];
    const currNumber = `${
      thousands ? intNumber.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : intNumber
    }${splitArr[1] ? decimal || "." : ""}${splitArr[1] || ""}`;
    const _numArr = currNumber.split("");
    setNumArr(_numArr);
  }, [value, decimals, decimal, thousands, maxLen]);

  const digitContainerCls = classNames(styles.digitContainer, {
    [`${styles.digitContainer_custom}`]: type === "custom",
  });

  return (
    <div className={styles.digitWrapper}>
      <div className={digitContainerCls} data-testid="digit-container">
        {numArr.map((d, index) => {
          if (Number.isNaN(Number(d))) {
            return (
              <div className={styles.digitDivider} key={index}>
                {d}
              </div>
            );
          }
          return <Slice key={index} digit={d} {...rest} />;
        })}
      </div>
    </div>
  );
}

export interface SliceProps
  extends Pick<
    DigitalNumberProps,
    "cellStyle" | "textStyle" | "height" | "easeSpeed" | "delaySpeed" | "width"
  > {
  digit?: string;
}

export const getPosition = (value: string, height: number): number => {
  const index = defaultNumberRange?.findIndex((item) => item === value);
  if (index && index > -1) return index * height * -1;
  return 0;
};

function Slice(props: SliceProps): React.ReactElement {
  const { digit, height, delaySpeed, width, easeSpeed } = props;
  const [cellHeight, setCellHeight] = useState(height);
  const [offset, setOffset] = useState(null);
  const sliceRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (sliceRef.current) {
      const digitBoxHeight = height ? height : sliceRef.current?.clientHeight;
      setCellHeight(digitBoxHeight);
      timerRef.current = setTimeout(() => {
        setOffset(getPosition(digit, digitBoxHeight));
      }, delaySpeed);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{ height: cellHeight, width }}
      data-testid={"digit-box"}
      className={styles.digitBox}
    >
      <div
        className={styles.digitSubBox}
        style={{
          transform: `translateY(${offset}px)`,
          transition: `transform ${easeSpeed}s ease-in-out`,
        }}
      >
        {defaultNumberRange.map((i) => {
          return (
            <div
              key={i}
              className={styles.digitCell}
              style={{ ...props.cellStyle, height: cellHeight, width }}
              ref={sliceRef}
            >
              <span style={props.textStyle}>{i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
