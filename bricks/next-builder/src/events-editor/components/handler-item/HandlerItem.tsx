// istanbul ignore file
// Ignore tests temporarily
import React, { useContext, createRef, useState, useEffect } from "react";
import {
  BrickEventHandler,
  UseProviderEventHandler,
  BrickEventsMap,
} from "@next-core/brick-types";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { processEvents } from "../../../shared/visual-events/getProcessedEvents";
import {
  getHandlerName,
  getHandlerType,
} from "../../../shared/visual-events/processEventHandler";
import { EditorContext } from "../../EventsEditor";
import { HandlerType } from "../../../shared/visual-events/interfaces";
import sharedStyle from "../../EventsEditor.module.css";
import styles from "./HandlerItem.module.css";
import { isNil } from "lodash";
export interface HandlerItemProps {
  type?: HandlerType;
  handler: BrickEventHandler;
  uniqKey?: string;
}

const handlerIconMap = {
  [HandlerType.BuiltinAction]: "code",
  [HandlerType.UseProvider]: "database",
  [HandlerType.ExecuteMethod]: "star",
  [HandlerType.SetProps]: "equals",
  [HandlerType.Unknown]: "question",
};

const callbackEvents = [
  { type: "success" },
  { type: "error" },
  { type: "finally" },
  { type: "progress" },
];

export function HandlerItem(props: HandlerItemProps): React.ReactElement {
  const { type, handler, uniqKey } = props;
  const context = useContext(EditorContext);
  const lastEventNameRef = createRef<HTMLDivElement>();
  const contentWrapperRef = createRef<HTMLDivElement>();
  const [lineHeight, setLineHight] = useState(0);

  useEffect(() => {
    const height =
      lastEventNameRef.current && contentWrapperRef.current
        ? lastEventNameRef.current.getBoundingClientRect()?.top -
          contentWrapperRef.current.getBoundingClientRect()?.top +
          15
        : 0;
    setLineHight(height);
  }, [contentWrapperRef, lastEventNameRef]);

  const handlerClick = (handler: BrickEventHandler): void => {
    context?.onEdit(handler, uniqKey);
  };

  return (
    <div className={styles[type]}>
      <div
        className={styles.handleContainer}
        onClick={() => handlerClick(handler)}
      >
        <FontAwesomeIcon
          icon={handlerIconMap[type] as FontAwesomeIconProps["icon"]}
          className={styles.icon}
        />
        <div className={styles.handler}>{getHandlerName(handler)}</div>
        {!isNil(handler.if) && <span className={styles.ifTag}>if</span>}
      </div>
      {type === HandlerType.UseProvider && (
        <div
          className={classNames(sharedStyle.eventWrapper, styles.callback)}
          ref={contentWrapperRef}
        >
          <div
            className={sharedStyle.strikeLine}
            style={{ height: lineHeight }}
          ></div>
          {processEvents(
            callbackEvents,
            (handler as UseProviderEventHandler).callback as BrickEventsMap
          )?.map((item, index, arr) => (
            <div key={item.name}>
              <div
                className={sharedStyle.eventName}
                {...(index === arr.length - 1 ? { ref: lastEventNameRef } : {})}
              >
                <FontAwesomeIcon
                  icon="bolt"
                  style={{ marginRight: 12 }}
                  className={sharedStyle.eventIcon}
                />
                {`callback.${item.name}`}

                <FontAwesomeIcon
                  className={sharedStyle.plusIcon}
                  icon="plus-square"
                  onClick={() =>
                    context?.onCreate(`${uniqKey}-callback-${item.name}`)
                  }
                />
              </div>

              <div className={sharedStyle.eventhandler}>
                {item.events.map((row, rowIndex) => (
                  <HandlerItem
                    key={rowIndex}
                    type={getHandlerType(row)}
                    handler={row}
                    uniqKey={`${uniqKey}-callback-${item.name}-${rowIndex}`}
                  ></HandlerItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
