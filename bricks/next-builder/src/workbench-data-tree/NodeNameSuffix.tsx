import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { hasOwnProperty } from "@next-core/brick-utils";
import type { ContextConf } from "@next-core/brick-types";
import type { RealTimeDataAnnotation } from "@next-types/preview";
import classNames from "classnames";
import { RealTimeDataContext } from "./RealTimeDataContext";
import styles from "./NodeNameSuffix.module.css";
import type { NodeNameSuffixProps } from "../shared/workbench/WorkbenchTreeContext";

export function NodeNameSuffix({ node }: NodeNameSuffixProps): JSX.Element {
  const { realTimeDataValues, onClick } = useContext(RealTimeDataContext);
  const [annotationElement, setAnnotationElement] =
    useState<HTMLSpanElement>(null);

  const { text, available, clickable } = useMemo(() => {
    const { name } = node.data as ContextConf;
    let annotation: RealTimeDataAnnotation;
    const annotationType =
      hasOwnProperty(realTimeDataValues, name) && !node.unreachable
        ? ((annotation = realTimeDataValues[name]), annotation.type)
        : null;

    let text: string;
    let available = true;
    // let clickable = false;
    switch (annotationType) {
      case "string":
      // clickable = true;
      // eslint-disable-next-line no-fallthrough
      case "boolean":
      case "number":
        text = JSON.stringify(annotation.value);
        break;
      case "null":
      case "undefined":
        text = annotationType;
        break;
      case "object":
        text = "{…}";
        // clickable = true;
        break;
      case "array":
        text = `(${annotation.length}) […]`;
        // clickable = true;
        break;
      default:
        available = false;
    }
    return { text, available, clickable: true };
  }, [node, realTimeDataValues]);

  const annotationCallback = useCallback((element: HTMLSpanElement | null) => {
    setAnnotationElement(element);
  }, []);

  useEffect(() => {
    if (annotationElement && clickable && onClick) {
      const handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        onClick(node);
      };
      annotationElement.addEventListener("click", handleClick);
      return () => {
        annotationElement.removeEventListener("click", handleClick);
      };
    }
  }, [annotationElement, clickable, node, onClick]);

  return available ? (
    <span
      className={classNames(styles.annotation, {
        [styles.clickable]: clickable,
      })}
      ref={annotationCallback}
    >
      {text}
    </span>
  ) : null;
}
