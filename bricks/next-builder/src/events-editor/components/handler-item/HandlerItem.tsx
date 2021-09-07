import React, { useContext, createRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
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
import { getProcessedEvents } from "../../../custom-processors/getProcessedEvents";
import { getHandlerName, getHanderType } from "../../processor";
import { EditorContext } from "../../EventsEditor";
import sharedStyle from "../../EventsEditor.module.css";
import styles from "./HandlerItem.module.css";
import { isNil } from "lodash";

export enum HandlerType {
  BuiltinAction = "builtinAction",
  UseProvider = "useProvider",
  ExectuteMethod = "exectuteMethod",
  SetPorps = "setPorps",
  Unkown = "unkown",
}

export interface HandlerItemProps {
  type?: HandlerType;
  handler: BrickEventHandler;
}

const handlerIconMap = {
  [HandlerType.BuiltinAction]: "code",
  [HandlerType.UseProvider]: "database",
  [HandlerType.ExectuteMethod]: "star",
  [HandlerType.SetPorps]: "equals",
  [HandlerType.Unkown]: "question",
};
const callbackEvents = [
  { type: "success" },
  { type: "error" },
  { type: "finally" },
];

export function HandlerItem(props: HandlerItemProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { type, handler } = props;
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
    context?.onEdit(handler);
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
      {(handler as UseProviderEventHandler).callback && (
        <div
          className={classNames(sharedStyle.eventWrapper, styles.callback)}
          ref={contentWrapperRef}
        >
          <div
            className={sharedStyle.strikeLine}
            style={{ height: lineHeight }}
          ></div>
          {getProcessedEvents(
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
                  onClick={() => context?.onCreate(`callback.${item.name}`)}
                />
              </div>

              <div className={sharedStyle.eventhandler}>
                {item.events.map((row, rowIndex) => (
                  <HandlerItem
                    key={rowIndex}
                    type={getHanderType(row)}
                    handler={row}
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
