import React, { useEffect } from "react";
import {
  BuildFilled,
  CopyFilled,
  DatabaseFilled,
  GoldenFilled,
  NumberOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { GeneralIcon } from "@next-libs/basic-components";
import { useDrag } from "react-dnd";
import { BuilderDataTransferType } from "@next-core/editor-bricks-helper";
import { BrickOptionItem, LayerType } from "../interfaces";
import styles from "./BrickItem.module.css";

export interface BrickItemProps {
  brick: BrickOptionItem;
  onDraggingChange?: (isDragging: boolean) => void;
  layerType?: LayerType;
}

export function BrickItem({
  brick,
  onDraggingChange,
  layerType,
}: BrickItemProps): React.ReactElement {
  let brickType: string;
  switch (brick.type) {
    case "provider":
    case "template":
      brickType = brick.type;
    // `customTemplate` will be treated as `brick`.
  }

  const transferItem =
    brick.type === "snippet"
      ? {
          type: BuilderDataTransferType.SNIPPET_TO_APPLY,
          bricks: brick.bricks,
        }
      : {
          type: BuilderDataTransferType.NODE_TO_ADD,
          brickType,
          brick: brick.id,
        };

  const [{ isDragging }, dragRef] = useDrag({
    item: transferItem,
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

  if (brick.icon) {
    icon = <GeneralIcon icon={brick.icon} />;
  } else if (layerType === "widget") {
    icon = brick.thumbnail ? <img src={brick.thumbnail} /> : <BuildFilled />;
  } else {
    switch (brick.type) {
      case "provider":
        icon = <DatabaseFilled />;
        break;
      case "template":
        icon = <GoldenFilled />;
        break;
      case "customTemplate":
        icon = (
          <CopyFilled
            className={classNames({
              [styles.thumbnailType]: layerType !== LayerType.BRICK,
            })}
          />
        );
        break;
      case "snippet":
        icon = brick.thumbnail ? (
          <img src={brick.thumbnail} />
        ) : (
          <NumberOutlined
            className={classNames({
              [styles.thumbnailType]: layerType !== LayerType.BRICK,
            })}
          />
        );
        break;
      default:
        icon = <BuildFilled />;
    }
  }

  return (
    <div
      className={`${styles.brickItem} ${styles[brick.type]} ${
        styles[`layer-${layerType ?? LayerType.BRICK}`]
      }`}
      title={brick.description || brick.title}
      ref={dragRef}
    >
      <span className={styles.brickIcon}>{icon}</span>
      <span className={styles.brickName}>{brick.title}</span>
    </div>
  );
}
