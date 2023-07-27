import React from "react";

import style from "./brick-placeholder.module.css";

interface BrickPlaceholderProps {
  text?: string;
}

export function BrickPlaceholder(
  props: BrickPlaceholderProps
): React.ReactElement {
  return <div className={style.placeholder}>{props.text}</div>;
}
