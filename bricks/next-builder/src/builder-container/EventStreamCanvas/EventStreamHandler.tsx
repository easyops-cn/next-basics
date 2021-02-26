/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrickEventHandler } from "@next-core/brick-types";
import { EventStreamNode } from "./interfaces";
import { styleConfig } from "./styleConfig";
import {
  isBuiltinHandler,
  isEventDownstreamNode,
  isExecuteHandler,
  isSetPropsHandler,
  isUseProviderHandler,
} from "./assertions";

import styles from "./EventStreamHandler.module.css";

export interface EventNodeHandlerProps {
  eventNode: EventStreamNode;
  handler: BrickEventHandler;
  isLast?: boolean;
  targetMap?: Map<string, string>;
  setEventStreamNodeId?: React.Dispatch<React.SetStateAction<string>>;
}

export function EventStreamHandler({
  eventNode,
  handler,
  isLast,
  targetMap,
  setEventStreamNodeId,
}: EventNodeHandlerProps): React.ReactElement {
  let icon: React.ReactElement;
  let title: string;
  let content: string;
  let handlerClassName: string;
  let targetNodeId: string;
  let isTargetOfSelf = false;
  if (isBuiltinHandler(handler)) {
    icon = <FontAwesomeIcon icon="code" />;
    title = "action:";
    content = handler.action;
    handlerClassName = styles.handlerTypeOfBuiltin;
  } else if (isUseProviderHandler(handler)) {
    icon = <FontAwesomeIcon icon="database" />;
    title = "useProvider:";
    content = handler.useProvider;
    handlerClassName = styles.handlerTypeOfUseProvider;
  } else if (isExecuteHandler(handler)) {
    icon = <FontAwesomeIcon icon="wrench" />;
    title = `${handler.method}(…)`;
    content = (handler.target as string) || handler.targetRef;
    handlerClassName = styles.handlerTypeOfExecute;
  } else if (isSetPropsHandler(handler)) {
    icon = <FontAwesomeIcon icon="pen-square" />;
    title = "set properties:";
    content = (handler.target as string) || handler.targetRef;
    handlerClassName = styles.handlerTypeOfSetProps;
  } else {
    icon = <FontAwesomeIcon icon="question-circle" />;
    title = "unknown:";
    content = JSON.stringify(handler);
    handlerClassName = styles.handlerTypeOfUnknown;
  }

  if (
    isEventDownstreamNode(eventNode) &&
    (isExecuteHandler(handler) || isSetPropsHandler(handler))
  ) {
    targetNodeId = targetMap.get(handler.target as string);
    isTargetOfSelf = handler.target === "_self";
  }

  const handleGotoTargetNode = React.useCallback(() => {
    if (targetNodeId) {
      setEventStreamNodeId(targetNodeId);
    }
  }, [setEventStreamNodeId, targetNodeId]);

  return (
    <li
      className={classNames(styles.handler, handlerClassName, {
        [styles.targetIsAvailable]: !!targetNodeId,
        [styles.isTargetOfSelf]: isTargetOfSelf,
      })}
      style={{
        ...styleConfig.item,
        marginBottom: isLast ? 0 : styleConfig.item.marginBottom,
      }}
      onClick={handleGotoTargetNode}
    >
      <div className={styles.handlerIcon}>{icon}</div>
      <div className={styles.handlerBody}>
        <div className={styles.handlerTitle}>{title}</div>
        <div className={styles.handlerContent}>{content}</div>
      </div>
    </li>
  );
}
