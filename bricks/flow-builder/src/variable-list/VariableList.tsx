import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
import styles from "./VariableList.module.css";
import { VariableItem } from "../variable-item/VariableItem";

interface PropListProps {
  value: any[] | Record<string, any>;
}

export function VariableList(props: PropListProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);

  const { value } = props;
  return (
    <ul className={styles.propList}>
      {Array.isArray(value)
        ? value.map((item, index) => (
            <VariableItem
              key={index}
              propName={String(index)}
              propValue={item}
            />
          ))
        : Object.entries(value).map((entry) => (
            <VariableItem
              key={entry[0]}
              propName={entry[0]}
              propValue={entry[1]}
            />
          ))}
    </ul>
  );
}
