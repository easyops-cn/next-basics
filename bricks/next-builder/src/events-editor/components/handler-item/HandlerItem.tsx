// istanbul ignore file
// Ignore tests temporarily
import React, {
  useContext,
  createRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  BrickEventHandler,
  UseProviderEventHandler,
  BrickEventsMap,
  BuiltinBrickEventHandler,
} from "@next-core/brick-types";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { useTranslation } from "react-i18next";
import {
  getHandlerName,
  getHandlerType,
} from "../../../shared/visual-events/processEventHandler";
import { EditorContext } from "../../EventsEditor";
import { Tooltip } from "antd";
import { AddEventBtn } from "../add-event-btn/AddEventBtn";
import {
  CustomBrickEventType,
  HandlerType,
  LifeCycle,
} from "../../../shared/visual-events/interfaces";
import { hasCallbackActions } from "../../../shared/visual-events/constants";
import sharedStyle from "../../EventsEditor.module.css";
import styles from "./HandlerItem.module.css";
import { isNil } from "lodash";
import { getProcessedEvents } from "../../../shared/visual-events/getProcessedEvents";

export interface HandlerItemProps {
  type?: Exclude<HandlerType, HandlerType.CustomBrick> & CustomBrickEventType;
  handler: BrickEventHandler;
  uniqKey?: string;
  name?: string;
}

const handlerIconMap = {
  [HandlerType.BuiltinAction]: "code",
  [HandlerType.UseProvider]: "database",
  [CustomBrickEventType.ExecuteMethod]: "star",
  [CustomBrickEventType.SetProps]: "equals",
  [HandlerType.Unknown]: "question",
};

const callbackEvents = [
  { type: "success" },
  { type: "error" },
  { type: "finally" },
  { type: "progress" },
];

export function HandlerItem(props: HandlerItemProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { type, handler, uniqKey, name } = props;
  const context = useContext(EditorContext);
  const actionBtnRef = createRef<HTMLDivElement>();
  const contentWrapperRef = createRef<HTMLDivElement>();
  const [lineHeight, setLineHight] = useState(0);

  useEffect(() => {
    const height =
      actionBtnRef.current && contentWrapperRef.current
        ? actionBtnRef.current.getBoundingClientRect()?.top -
          contentWrapperRef.current.getBoundingClientRect()?.top +
          15
        : 0;
    setLineHight(height);
  }, [contentWrapperRef, actionBtnRef]);

  const handlerClick = (handler: BrickEventHandler): void => {
    if (getHandlerType(handler) !== HandlerType.Unknown) {
      context?.onEdit(handler, uniqKey, name);
    }
  };

  const showCallback = useMemo(() => {
    return (
      name !== LifeCycle.UseResolves &&
      (type === HandlerType.UseProvider ||
        (handler as UseProviderEventHandler).callback ||
        hasCallbackActions.includes(
          (handler as BuiltinBrickEventHandler).action
        ))
    );
  }, [handler, name, type]);

  const handlerCallback = (
    <>
      <div
        className={classNames(sharedStyle.eventWrapper, styles.callback)}
        ref={contentWrapperRef}
      >
        <div
          className={sharedStyle.strikeLine}
          style={{ height: lineHeight }}
        ></div>
        {getProcessedEvents(
          (handler as UseProviderEventHandler).callback as BrickEventsMap
        )?.map((item) => (
          <div key={item.name}>
            <div className={sharedStyle.eventName}>
              <FontAwesomeIcon
                icon="bolt"
                style={{ marginRight: 12 }}
                className={sharedStyle.eventIcon}
              />
              {`callback.${item.name}`}

              <div className={sharedStyle.iconWrapper}>
                <FontAwesomeIcon
                  className={sharedStyle.plusIcon}
                  icon="plus-square"
                  onClick={() =>
                    context?.onCreate(
                      `${uniqKey}-callback-${item.name}`,
                      `callback.${item.name}`
                    )
                  }
                />

                <FontAwesomeIcon
                  className={sharedStyle.removeIcon}
                  icon="minus-square"
                  onClick={() =>
                    context.removeCallback?.(`${uniqKey}-callback-${item.name}`)
                  }
                />
              </div>
            </div>

            <div className={sharedStyle.eventHandler}>
              {item.events.map((row, rowIndex) => (
                <HandlerItem
                  key={rowIndex}
                  name={`callback.${item.name}`}
                  type={getHandlerType(row)}
                  handler={row}
                  uniqKey={`${uniqKey}-callback-${item.name}-${rowIndex}`}
                ></HandlerItem>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={sharedStyle.actionArea} ref={actionBtnRef}>
        <AddEventBtn
          eventDocInfo={callbackEvents}
          eventList={getProcessedEvents(
            (handler as UseProviderEventHandler).callback as BrickEventsMap
          )}
          onClick={(name) =>
            context.addCallback?.(`${uniqKey}-callback-${name}`)
          }
        />
      </div>
    </>
  );

  return (
    <div className={styles[type]}>
      <div
        className={classNames(styles.handleContainer, {
          [styles.unknown]: type === HandlerType.Unknown,
        })}
        onClick={() => handlerClick(handler)}
      >
        <FontAwesomeIcon
          icon={handlerIconMap[type] as FontAwesomeIconProps["icon"]}
          className={styles.icon}
        />
        <div className={styles.handler}>
          <Tooltip
            title={
              getHandlerType(handler) === HandlerType.Unknown &&
              t(K.DO_NOT_SUPPORT_VISUAL_CONFIG)
            }
          >
            {getHandlerName(handler)}
          </Tooltip>
        </div>
        {!isNil(handler.if) && <span className={styles.ifTag}>if</span>}
      </div>
      {showCallback && handlerCallback}
    </div>
  );
}
