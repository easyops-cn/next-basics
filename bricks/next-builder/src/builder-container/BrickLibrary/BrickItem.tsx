import React, { useEffect } from "react";
import {
  BuildFilled,
  CopyFilled,
  DatabaseFilled,
  GoldenFilled,
} from "@ant-design/icons";
import { useDrag } from "react-dnd";
import { BuilderDataTransferType } from "@next-core/editor-bricks-helper";
import { BrickOptionItem } from "../interfaces";
import styles from "./BrickItem.module.css";

export interface BrickItemProps {
  brick: BrickOptionItem;
  onDraggingChange?: (isDragging: boolean) => void;
}

export function BrickItem({
  brick,
  onDraggingChange,
}: BrickItemProps): React.ReactElement {
  let brickType: string;
  switch (brick.type) {
    case "provider":
    case "template":
      brickType = brick.type;
    // `customTemplate` will be treated as `brick`.
  }

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: BuilderDataTransferType.NODE_TO_ADD,
      brickType,
      brick: brick.name,
    },
    options: {
      dropEffect: "copy",
    },
    collect: /* istanbul ignore next */ (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    onDraggingChange?.(isDragging);
  }, [isDragging, onDraggingChange]);

  let icon: JSX.Element;

  switch (brick.type) {
    case "provider":
      icon = <DatabaseFilled />;
      break;
    case "template":
      icon = <GoldenFilled />;
      break;
    case "customTemplate":
      icon = <CopyFilled />;
      break;
    default:
      icon = <BuildFilled />;
  }

  return (
    <div className={`${styles.brickItem} ${styles[brick.type]}`} ref={dragRef}>
      <span className={styles.brickIcon}>{icon}</span>
      <span className={styles.brickName} title={brick.shortName}>
        {brick.shortName}
      </span>
    </div>
  );
}
