import React, { useEffect } from "react";
import classNames from "classnames";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { VariableDisplay } from "./variable-display/VariableDisplay";
import { isObject } from "./variable-display/VariableDisplay";
import { VariableList } from "../variable-list/VariableList";
import { VariableContext } from "./constants";
import styles from "../variable-list/VariableList.module.css";

interface VariableItemProps {
  propValue: any;
  propName?: string;
  standalone?: boolean;
  expand?: boolean;
  ellipsis?: boolean;
  empty?: boolean;
  uninitialized?: boolean;
  labelBrick?: {
    useBrick: UseBrickConf;
  };
}

export function VariableItem({
  propValue,
  propName,
  standalone,
  expand,
  ellipsis,
  empty,
  uninitialized,
  labelBrick,
}: VariableItemProps): React.ReactElement {
  const [expanded, setExpanded] = React.useState(expand);

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  }, []);

  const hasChildren = isObject(propValue);

  return React.createElement(
    standalone ? "div" : "li",
    {
      className: classNames(styles.propItem, { expanded }),
    },
    <VariableContext.Provider value={{ ellipsis }}>
      <div className={classNames(styles.ellipsis, styles.propItemLabel)}>
        <span onClick={handleClick}>
          {(!standalone || hasChildren) &&
            (hasChildren ? (
              expanded ? (
                <CaretDownOutlined />
              ) : (
                <CaretRightOutlined />
              )
            ) : (
              <span className={styles.blankCube}></span>
            ))}
          {!standalone && (
            <>
              <span className={styles.propName}>{propName}</span>
              <span className={styles.propPunctuation}>:</span>{" "}
            </>
          )}
        </span>
        <span>
          {labelBrick?.useBrick && (
            <BrickAsComponent
              useBrick={labelBrick.useBrick}
              data={{ name: propName, value: propValue }}
            />
          )}
        </span>
        <VariableDisplay
          value={propValue}
          expanded={expanded}
          ellipsis={ellipsis}
          empty={empty}
          uninitialized={uninitialized}
          labelBrick={labelBrick}
        />
      </div>
      {hasChildren && expanded && (
        <VariableList
          value={propValue}
          expand={expand}
          ellipsis={ellipsis}
          labelBrick={labelBrick}
        />
      )}
    </VariableContext.Provider>
  );
}
