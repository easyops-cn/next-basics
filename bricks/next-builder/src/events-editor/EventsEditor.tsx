// istanbul ignore file
// Ignore tests temporarily
import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BrickEventHandler } from "@next-core/brick-types";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HandlerItem } from "./components/handler-item/HandlerItem";
import { getHanderType } from "../shared/visual-events/processEventHandler";
import styles from "./EventsEditor.module.css";
import { get, set } from "lodash";

export interface EventConfig {
  name?: string;
  events?: BrickEventHandler[];
}

export interface EventsEditorProps {
  brickName?: string;
  eventList: EventConfig[];
  onCreate?: (key: string) => void;
  onEdit?: (handler: BrickEventHandler, key: string) => void;
  onRemove?: (handler: BrickEventHandler, key: string) => void;
  onChange?: (eventList: EventConfig[]) => void;
}

export interface EditorRef {
  addEventHandler: (handler: BrickEventHandler, key: string) => void;
  editEventHandler: (handler: BrickEventHandler, key: string) => void;
  removeEventHandler: (key: string) => void;
}

export const EditorContext = React.createContext<{
  onCreate?: EventsEditorProps["onCreate"];
  onEdit?: EventsEditorProps["onEdit"];
  onRemove?: EventsEditorProps["onRemove"];
}>({});

export function LegacyEventsEditor(
  props: EventsEditorProps,
  ref: React.Ref<EditorRef>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const { brickName, onCreate, onEdit, onChange } = props;
  const [lineHeight, setLineHight] = useState(0);
  const [eventList, setEventList] = useState(props.eventList);

  const lastEventNameRef = createRef<HTMLDivElement>();
  const contentWrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setEventList(props.eventList);
  }, [props.eventList]);

  useEffect(() => {
    const height =
      lastEventNameRef.current && contentWrapperRef.current
        ? lastEventNameRef.current.getBoundingClientRect()?.top -
          contentWrapperRef.current.getBoundingClientRect()?.top +
          15
        : 0;
    setLineHight(height);
  }, [contentWrapperRef, lastEventNameRef]);

  const addEventHandler = (handler: BrickEventHandler, key: string): void => {
    const pathArr = key.split("-");
    const mutableEvents = [...eventList];

    const find = get(mutableEvents, pathArr);

    if (find) {
      find.push(handler);
    } else {
      set(mutableEvents, pathArr, [handler]);
    }

    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  const editEventHandler = (handler: BrickEventHandler, key: string): void => {
    const pathArr = key.split("-");
    const mutableEvents = [...eventList];

    set(mutableEvents, pathArr, handler);

    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  const removeEventHandler = (key: string): void => {
    const pathArr = key.split("-");
    const mutableEvents = [...eventList];

    const parent = get(mutableEvents, pathArr.slice(0, -1));

    if (Array.isArray(parent)) {
      parent.splice(Number(pathArr.pop()), 1);
    } else {
      set(mutableEvents, pathArr.slice(0, -1), []);
    }

    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  useImperativeHandle(ref, () => ({
    addEventHandler,
    editEventHandler,
    removeEventHandler,
  }));

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
                onClick={() => onCreate(`${index}-events`)}
              />
            </div>

            <div className={styles.eventhandler}>
              {item.events.map((row, rowIndex) => (
                <HandlerItem
                  key={rowIndex}
                  type={getHanderType(row)}
                  handler={row}
                  uniqKey={`${index}-events-${rowIndex}`}
                ></HandlerItem>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EditorContext.Provider>
  );
}

export const EventsEditor = forwardRef(LegacyEventsEditor);
