import React from "react";
import classNames from "classnames";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import styles from "./ListContainer.module.css";

interface ListContainerProps {
  data: any[];
  itemKey?: string;
  useBrick: UseBrickConf;
  gap?: string | number;
  containerStyle?: React.CSSProperties;
  extraContainerStyle?: React.CSSProperties;
}

export function ListContainer(props: ListContainerProps): React.ReactElement {
  const { data, itemKey, gap, extraContainerStyle, useBrick } = props;

  if (!Array.isArray(data)) {
    return null;
  }

  let containerStyle: React.CSSProperties = props.containerStyle;
  if (!containerStyle) {
    containerStyle = {
      display: "grid",
      gap: gap ?? "var(--card-content-gap)",
      ...extraContainerStyle,
    };
  }

  return (
    <div
      className={classNames({
        [styles.listContainerAsGrid]: containerStyle.display === "grid",
      })}
      style={containerStyle}
    >
      {data.map((item, index) => (
        <BrickAsComponent
          key={(itemKey && item[itemKey]) ?? index}
          data={item}
          useBrick={useBrick}
        />
      ))}
    </div>
  );
}
