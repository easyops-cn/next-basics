import React, { useRef } from "react";
import { LinkOutlined, CodeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDrag, useDrop } from "react-dnd";
import styles from "./ContextItem.module.css";
import classNames from "classnames";
import { ContextConf } from "@next-core/brick-types";

const type = "context-item";

interface ContextItemProps {
  index: number;
  data: ContextConf;
  canDrag: boolean;
  highlighted?: boolean;
  handleDropItem: (dragIndex: number, hoverIndex: number) => void;
  handleItemClick: () => void;
  handleItemDelete: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleItemHover?: (contextName?: string) => void;
}

export function ContextItem({
  index,
  data,
  canDrag,
  highlighted,
  handleDropItem,
  handleItemClick,
  handleItemDelete,
  handleItemHover,
}: ContextItemProps): React.ReactElement {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index
            ? `${styles.dropOverDownward}`
            : `${styles.dropOverUpward}`,
      };
    },
    drop: (item: any) => {
      handleDropItem(item.index, index);
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type, index },
    canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  const handleMouseEnter = (): void => {
    handleItemHover(data.name);
  };

  const handleMouseLeave = (): void => {
    handleItemHover();
  };

  return (
    <div
      ref={ref}
      className={classNames(styles.varItem, {
        [dropClassName]: isOver,
        [styles.highlighted]: highlighted,
      })}
      onClick={handleItemClick}
      key={data.name}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {data.resolve ? (
        <LinkOutlined style={{ color: "var(--theme-orange-color)" }} />
      ) : (
        <CodeOutlined style={{ color: "var(--theme-green-color)" }} />
      )}
      <span className={styles.varName}>{data.name}</span>
      <Button
        type="link"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteIcon}
        onClick={handleItemDelete}
      />
    </div>
  );
}
