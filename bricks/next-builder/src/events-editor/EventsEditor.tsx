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
import { BrickAsComponent } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import {
  BrickEventHandler,
  UseBrickConf,
  MenuIcon,
} from "@next-core/brick-types";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HandlerItem } from "./components/handler-item/HandlerItem";
import { getHandlerType } from "../shared/visual-events/processEventHandler";
import { EventConfig, EventsDoc } from "../shared/visual-events/interfaces";
import styles from "./EventsEditor.module.css";
import { get, set } from "lodash";
import { LoadingOutlined } from "@ant-design/icons";
import { AddEventBtn } from "./components/add-event-btn/AddEventBtn";

export interface EventsEditorProps {
  customTitle?: string;
  titleIcon?: MenuIcon;
  eventList: EventConfig[];
  eventDocInfo?: EventsDoc[];
  updatedViewKey?: string;
  loading?: boolean;
  onCreate?: (key: string, eventName?: string) => void;
  onEdit?: (handler: BrickEventHandler, key: string, eventName: string) => void;
  onRemove?: (handler: BrickEventHandler, key: string) => void;
  onChange?: (eventList: EventConfig[]) => void;
  suffixTitle?: {
    useBrick: UseBrickConf;
  };
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
  addCallback?: (key: string) => void;
  removeCallback?: (key: string) => void;
}>({});

export function LegacyEventsEditor(
  props: EventsEditorProps,
  ref: React.Ref<EditorRef>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const {
    customTitle,
    updatedViewKey,
    onCreate,
    onEdit,
    onChange,
    titleIcon,
    suffixTitle,
    eventDocInfo,
    loading,
  } = props;
  const [lineHeight, setLineHight] = useState(0);
  const [eventList, setEventList] = useState(props.eventList);

  const actionBtnRef = createRef<HTMLDivElement>();
  const contentWrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setEventList(props.eventList);
  }, [props.eventList]);

  useEffect(() => {
    const height =
      actionBtnRef.current && contentWrapperRef.current
        ? actionBtnRef.current.getBoundingClientRect()?.top -
          contentWrapperRef.current.getBoundingClientRect()?.top +
          15
        : 0;
    setLineHight(height);
  }, [contentWrapperRef, actionBtnRef, updatedViewKey]);

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

  const handleTopLevelRemove = (index: number): void => {
    const mutableEvents = [...eventList];
    mutableEvents.splice(index, 1);
    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  const addCallback = (key: string): void => {
    const pathArr = key.split("-");
    const mutableEvents = [...eventList];

    set(mutableEvents, pathArr, []);

    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  const removeCallback = (key: string): void => {
    const pathArr = key.split("-");
    const mutableEvents = [...eventList];
    const callback = get(mutableEvents, pathArr.slice(0, -1));
    if (callback) {
      const name = pathArr.pop();
      delete callback[name];
    }

    setEventList(mutableEvents);
    onChange?.(mutableEvents);
  };

  useImperativeHandle(ref, () => ({
    addEventHandler,
    editEventHandler,
    removeEventHandler,
  }));

  const handlerBtnClick = (key: string): void => {
    setEventList([...eventList, { name: key, events: [] }]);
  };

  const getEventDesc = (name: string): string => {
    return eventDocInfo?.find((item) => item.type === name)?.description;
  };

  return (
    <EditorContext.Provider
      value={{ onCreate, onEdit, addCallback, removeCallback }}
    >
      <div className={styles.titleWrapper}>
        <div className={styles.brickName}>
          <GeneralIcon
            icon={titleIcon}
            style={{ marginRight: 12 }}
          ></GeneralIcon>
          {customTitle}

          {loading && <LoadingOutlined style={{ marginLeft: 12 }} />}
        </div>
        {suffixTitle && <BrickAsComponent useBrick={suffixTitle.useBrick} />}
      </div>

      <div className={styles.eventWrapper} ref={contentWrapperRef}>
        <div className={styles.strikeLine} style={{ height: lineHeight }}></div>
        {eventList?.map((item, index) => (
          <div key={item.name}>
            <div className={styles.eventName}>
              <FontAwesomeIcon
                icon="bolt"
                style={{ marginRight: 12 }}
                className={styles.eventIcon}
              />
              <span title={getEventDesc(item.name)}>{item.name}</span>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon
                  className={styles.plusIcon}
                  icon="plus-square"
                  onClick={() => onCreate(`${index}-events`, item.name)}
                />

                <FontAwesomeIcon
                  className={styles.removeIcon}
                  icon="minus-square"
                  onClick={() => handleTopLevelRemove(index)}
                />
              </div>
            </div>

            <div className={styles.eventHandler}>
              {item.events.map((row, rowIndex) => (
                <HandlerItem
                  key={rowIndex}
                  name={item.name}
                  type={getHandlerType(row)}
                  handler={row}
                  uniqKey={`${index}-events-${rowIndex}`}
                ></HandlerItem>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionArea} ref={actionBtnRef}>
        <AddEventBtn
          eventList={eventList}
          eventDocInfo={eventDocInfo}
          onClick={handlerBtnClick}
        />
      </div>
    </EditorContext.Provider>
  );
}

export const EventsEditor = forwardRef(LegacyEventsEditor);
