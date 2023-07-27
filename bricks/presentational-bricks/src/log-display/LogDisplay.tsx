import React, { useMemo } from "react";
import style from "./index.module.css";
import { isNil, escape } from "lodash";

function handleBackspace(value?: string, i = 0): string {
  if (!isNil(value)) {
    const outputCharArr: string[] = [];
    let charCount = 0;
    let backspaceLength = 0;

    for (const char of value) {
      charCount++;

      if (char.codePointAt(0) === 8) {
        backspaceLength++;
      } else {
        if (backspaceLength) {
          outputCharArr.splice(-backspaceLength, backspaceLength);
          backspaceLength = 0;
        }

        outputCharArr.push(char);
      }
    }

    return charCount === outputCharArr.length ? value : outputCharArr.join("");
  } else {
    return value;
  }
}

export interface LogDisplayProps {
  value: string;
  loadingIcon?: boolean;
  hasBackspace?: boolean;
  containerStyle?: React.CSSProperties;
}

export function LogDisplay(props: LogDisplayProps): React.ReactElement {
  const { loadingIcon = true, hasBackspace, containerStyle } = props;
  const value = useMemo(
    () => (hasBackspace ? handleBackspace(props.value) : props.value),
    [props.value, hasBackspace]
  );

  const ellipsis = (
    <div className={style.ellipsis}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );

  return (
    <pre className={style.terminal} style={containerStyle}>
      <div dangerouslySetInnerHTML={{ __html: escape(value) }}></div>
      {loadingIcon && ellipsis}
    </pre>
  );
}
