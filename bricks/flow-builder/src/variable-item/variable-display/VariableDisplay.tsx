import React, { useContext } from "react";
import classNames from "classnames";
import { VariableContext } from "../constants";
import styles from "./VariableDisplay.module.css";
import { UseBrickConf } from "@next-core/brick-types";
import { hasOwnProperty } from "@next-core/brick-utils";

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && !!value;
}

interface VariableDisplayProps<T = any> {
  value: T;
  minimal?: boolean;
  expanded?: boolean;
  ellipsis?: boolean;
  empty?: boolean;
  uninitialized?: boolean;
  labelBrick?: {
    useBrick: UseBrickConf;
  };
}

export function VariableDisplay(
  props: VariableDisplayProps
): React.ReactElement {
  const { value, empty, uninitialized } = props;

  if (empty) {
    return <span className={styles.empty}>empty</span>;
  }
  if (uninitialized) {
    return (
      <span className={styles.uninitialized}>&lt;value unavailable&gt;</span>
    );
  }
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
      {new Array(value.length).fill(null).map((_item, index) => (
        <React.Fragment key={index}>
          <VariableDisplay
            value={value[index]}
            minimal
            empty={!hasOwnProperty(value, index)}
          />
          {index < value.length - 1 && ", "}
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
