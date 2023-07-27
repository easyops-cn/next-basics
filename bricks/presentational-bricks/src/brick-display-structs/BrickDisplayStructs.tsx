import React from "react";
import { get, isObject } from "lodash";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { FieldToDisplay } from "./index";

interface BrickDisplayStructsProps {
  // object or array
  value: any;
  displayType: "stringify" | FieldToDisplay;
  emptyText: string;
}

function stringify(value: any): string {
  return JSON.stringify(value);
}

function partField(
  value: any,
  displayType: FieldToDisplay,
  emptyText: string,
  error: string
): string {
  let result = "";

  if (value === undefined) {
    return emptyText || error;
  } else if (Array.isArray(value)) {
    result = value
      .map((item) => {
        return displayType.field
          ? get(item, displayType.field, error)
          : isObject(item)
          ? stringify(item)
          : item;
      })
      .join(displayType.separator);
  } else {
    result = get(value, displayType.field, error);
  }

  return result;
}

export function BrickDisplayStructs(
  props: BrickDisplayStructsProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const error = t(K.UNKNOWN_ERROR);

  const text =
    props.displayType === "stringify"
      ? stringify(props.value)
      : partField(props.value, props.displayType, props.emptyText, error);

  return <span>{text}</span>;
}
