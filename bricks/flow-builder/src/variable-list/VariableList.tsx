import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
import styles from "./VariableList.module.css";
import { VariableItem } from "../variable-item/VariableItem";
import { UseBrickConf } from "@next-core/brick-types";

interface PropListProps {
  value: any[] | Record<string, any>;
  expand?: boolean;
  ellipsis?: boolean;
  labelBrick?: {
    useBrick: UseBrickConf;
  };
}

export function VariableList(props: PropListProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);

  const { value, expand, ellipsis, labelBrick } = props;
  return (
    <ul className={styles.propList}>
      {Array.isArray(value)
        ? value.map((item, index) => (
            <VariableItem
              key={index}
              expand={expand}
              ellipsis={ellipsis}
              propName={String(index)}
              propValue={item}
              labelBrick={labelBrick}
            />
          ))
        : Object.entries(value).map((entry) => (
            <VariableItem
              key={entry[0]}
              expand={expand}
              ellipsis={ellipsis}
              propName={entry[0]}
              propValue={entry[1]}
              labelBrick={labelBrick}
            />
          ))}
    </ul>
  );
}
