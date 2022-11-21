import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
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
}

export function VariableItem({
  propValue,
  propName,
  standalone,
  expand,
  ellipsis,
}: VariableItemProps): React.ReactElement {
  const [expanded, setExpanded] = React.useState(expand);

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  const handleClick = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

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
        <VariableDisplay
          value={propValue}
          expanded={expanded}
          ellipsis={ellipsis}
        />
      </div>
      {hasChildren && expanded && (
        <VariableList value={propValue} expand={expand} ellipsis={ellipsis} />
      )}
    </VariableContext.Provider>
  );
}
