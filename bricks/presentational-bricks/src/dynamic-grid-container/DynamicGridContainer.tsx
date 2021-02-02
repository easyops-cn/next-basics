import React, { useEffect } from "react";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import styles from "./DynamicGridContainer.module.css";
export interface DynamicGridContainerProps {
  useBrick?: UseBrickConf;
  containerStyle?: React.CSSProperties;
  data?: any[];
  onRendered?: (value: any) => void;
}
export function DynamicGridContainer(
  props: DynamicGridContainerProps
): React.ReactElement {
  const useBricks = Array.isArray(props.useBrick)
    ? props.useBrick
    : props.useBrick
    ? [props.useBrick]
    : [];
  const propsData = Array.isArray(props.data)
    ? props.data
    : props.data
    ? [props.data]
    : [];
  const renderBrick = (): React.ReactNode => {
    return useBricks.map((item, index) => (
      <BrickAsComponent key={index} data={propsData[index]} useBrick={item} />
    ));
  };
  useEffect(() => {
    if (props.onRendered && props.useBrick) {
      props.onRendered(props.data);
    }
  }, [props.useBrick]);

  return (
    <div
      className={styles.dynamicGridContainer}
      style={{ ...props.containerStyle }}
    >
      {props.useBrick ? renderBrick() : ""}
    </div>
  );
}
