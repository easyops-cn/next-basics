import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { NS_FLOW_BUILDER, K } from "../../i18n/constants";
import { VariableContext } from "../constants";
import styles from "./VariableDisplay.module.css";

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && !!value;
}

interface VariableDisplayProps<T = any> {
  value: T;
  minimal?: boolean;
  expanded?: boolean;
  ellipsis?: boolean;
}

export function VariableDisplay(
  props: VariableDisplayProps
): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const { value } = props;

  if (Array.isArray(value)) {
    return <ArrayDisplay {...props} />;
  }
  if (isObject(value)) {
    return <ObjectDisplay {...props} />;
  }
  switch (typeof value) {
    case "string":
      return <StringDisplay {...props} />;
    case "function":
      return <FunctionDisplay />;
    default:
      return <PrimitiveDisplay {...props} />;
  }
}

export function ArrayDisplay({
  value,
  minimal,
  expanded,
}: VariableDisplayProps<any[]>): React.ReactElement {
  if (minimal || expanded) {
    return (
      <span
        className={styles.variableInternalType}
      >{`Array(${value.length})`}</span>
    );
  }

  return (
    <span className={styles.variableArray}>
      <span
        className={styles.variableArrayLength}
      >{` (${value.length}) `}</span>
      [
      {value.map((item, index, array) => (
        <React.Fragment key={index}>
          <VariableDisplay value={item} minimal />
          {index < array.length - 1 && ", "}
        </React.Fragment>
      ))}
      ]
    </span>
  );
}

interface ObjectDisplayProps
  extends VariableDisplayProps<Record<string | number, any>> {
  constructorName?: string;
}

export function ObjectDisplay({
  value,
  minimal,
  expanded,
  constructorName,
}: ObjectDisplayProps): React.ReactElement {
  if (constructorName && (minimal || expanded)) {
    return <span className={styles.variableType}>{constructorName}</span>;
  }

  if (minimal) {
    return <span>{`{…}`}</span>;
  }

  if (expanded) {
    return <span className={styles.variableInternalType}>Object</span>;
  }

  return (
    <span className={styles.variableObject}>
      {constructorName && (
        <span className={styles.variableType}>{`${constructorName} `}</span>
      )}
      {"{"}
      {Object.entries(value).map((entry, index, array) => (
        <React.Fragment key={entry[0]}>
          <ObjectEntryDisplay propName={entry[0]} propValue={entry[1]} />
          {index < array.length - 1 && ", "}
        </React.Fragment>
      ))}
      {"}"}
    </span>
  );
}

interface ObjectEntryDisplayProps {
  propName: string | number;
  propValue: any;
}

export function ObjectEntryDisplay({
  propName,
  propValue,
}: ObjectEntryDisplayProps): React.ReactElement {
  return (
    <span className={styles.variableObjectEntry}>
      <span className={styles.variablePropName}>{propName}</span>
      <span className={styles.variablePropPunctuation}>:</span>{" "}
      <span className={styles.variablePropValue}>
        <VariableDisplay value={propValue} minimal />
      </span>
    </span>
  );
}

export function StringDisplay({
  value,
  minimal,
}: VariableDisplayProps<string>): React.ReactElement {
  const context = useContext(VariableContext);

  if (minimal) {
    return <span className={styles.variableString}>{`"${value}"`}</span>;
  }
  return (
    <span
      className={classNames(
        { [styles.stringWrap]: !context?.ellipsis },
        styles.variableStringFull
      )}
    >
      <span className={styles.variablePunctuation}>{'"'}</span>
      <span className={styles.variableString} title={value}>
        {value}
      </span>
      <span className={styles.variablePunctuation}>{'"'}</span>
    </span>
  );
}

export function FunctionDisplay(): React.ReactElement {
  return <span className={styles.variableFunction}>ƒ</span>;
}

export function PrimitiveDisplay({
  value,
}: VariableDisplayProps): React.ReactElement {
  return (
    <span
      className={classNames(styles.variablePrimitive, {
        [styles.variableNil]: value === null || value === undefined,
      })}
    >
      {String(value)}
    </span>
  );
}
