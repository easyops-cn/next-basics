import React from "react";
import classNames from "classnames";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import styles from "./ListContainer.module.css";

interface ListContainerProps {
  data: any[];
  useBrick: UseBrickConf;
  gap?: string | number;
  containerStyle?: React.CSSProperties;
  extraContainerStyle?: React.CSSProperties;
}

export function ListContainer(props: ListContainerProps): React.ReactElement {
  if (!Array.isArray(props.data)) {
    return null;
  }

  let containerStyle: React.CSSProperties = {};
  if (props.containerStyle) {
    containerStyle = props.containerStyle;
  } else {
    containerStyle = {
      display: "grid",
      gap: props.gap ?? "var(--card-content-gap)",
      ...props.extraContainerStyle,
    };
  }

  return (
    <div
      className={classNames({
        [styles.listContainerAsGrid]: containerStyle.display === "grid",
      })}
      style={containerStyle}
    >
      {props.data.map((item, index) => (
        <BrickAsComponent key={index} data={item} useBrick={props.useBrick} />
      ))}
    </div>
  );
}
