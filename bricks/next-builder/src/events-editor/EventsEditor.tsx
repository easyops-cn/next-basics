import React, { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrickEventHandler } from "@next-core/brick-types";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HandlerItem } from "./components/handler-item/HandlerItem";
import { getHanderType } from "./processor";
import styles from "./EventsEditor.module.css";

export interface EventConfig {
  name?: string;
  events?: BrickEventHandler[];
}

export interface EventsEditorProps {
  brickName?: string;
  eventList: EventConfig[];
  onCreate?: (eventName: string) => void;
  onEdit?: (handler: BrickEventHandler) => void;
}

export const EditorContext = React.createContext<{
  onCreate?: EventsEditorProps["onCreate"];
  onEdit?: EventsEditorProps["onEdit"];
}>({});

export function EventsEditor(props: EventsEditorProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const lastEventNameRef = createRef<HTMLDivElement>();
  const contentWrapperRef = createRef<HTMLDivElement>();
  const [lineHeight, setLineHight] = useState(0);
  const { brickName, eventList, onCreate, onEdit } = props;

  useEffect(() => {
    const height =
      lastEventNameRef.current && contentWrapperRef.current
        ? lastEventNameRef.current.getBoundingClientRect()?.top -
          contentWrapperRef.current.getBoundingClientRect()?.top +
          15
        : 0;
    setLineHight(height);
  }, [contentWrapperRef, lastEventNameRef]);

  return (
    <EditorContext.Provider value={{ onCreate, onEdit }}>
      <div className={styles.brickName}>
        <FontAwesomeIcon icon="cube" style={{ marginRight: 12 }} />
        {brickName}
      </div>

      <div className={styles.eventWrapper} ref={contentWrapperRef}>
        <div className={styles.strikeLine} style={{ height: lineHeight }}></div>
        {eventList?.map((item, index) => (
          <div key={item.name}>
            <div
              className={styles.eventName}
              {...(index === eventList.length - 1
                ? { ref: lastEventNameRef }
                : {})}
            >
              <FontAwesomeIcon
                icon="bolt"
                style={{ marginRight: 12 }}
                className={styles.eventIcon}
              />
              {item.name}

              <FontAwesomeIcon
                className={styles.plusIcon}
                icon="plus-square"
                onClick={() => onCreate(item.name)}
              />
            </div>

            <div className={styles.eventhandler}>
              {item.events.map((e, index) => (
                <HandlerItem
                  key={index}
                  type={getHanderType(e)}
                  handler={e}
                ></HandlerItem>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <EventItem
        type="title"
        enableEdit
        title="tpl-create-function-content"
        icon={{ icon: "cube", lib: "fa", prefix: "fas", color: "#fff" }}
        events={props.events}
      ></EventItem> */}
    </EditorContext.Provider>
  );
}
