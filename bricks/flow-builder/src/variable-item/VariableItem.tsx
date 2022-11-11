import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { VariableDisplay } from "./variable-display/VariableDisplay";
import { isObject } from "./variable-display/VariableDisplay";
import { VariableList } from "../variable-list/VariableList";
import classNames from "classnames";
import styles from "../variable-list/VariableList.module.css";

interface VariableItemProps {
  propValue: any;
  propName?: string;
  standalone?: boolean;
}

export function VariableItem({
  propValue,
  propName,
  standalone,
}: VariableItemProps): React.ReactElement {
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const hasChildren = isObject(propValue);

  return React.createElement(
    standalone ? "div" : "li",
    {
      className: classNames(styles.propItem, { expanded }),
    },
    <>
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
        <VariableDisplay value={propValue} expanded={expanded} />
      </div>
      {hasChildren && expanded && <VariableList value={propValue} />}
    </>
  );
}
