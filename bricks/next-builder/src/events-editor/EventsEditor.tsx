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
import styles from "./EventsEditor.module.css";
import { get, set } from "lodash";
import { Button, Dropdown, Menu, Tooltip } from "antd";

export interface EventConfig {
  name?: string;
  events?: BrickEventHandler[];
}

export interface EventsDoc {
  type: string;
  description?: string;
}

export interface EventsEditorProps {
  customTitle?: string;
  titleIcon?: MenuIcon;
  eventList: EventConfig[];
  eventDocInfo?: EventsDoc[];
  updatedViewKey?: string;
  onCreate?: (key: string, eventName?: string) => void;
  onEdit?: (handler: BrickEventHandler, key: string) => void;
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

  useImperativeHandle(ref, () => ({
    addEventHandler,
    editEventHandler,
    removeEventHandler,
  }));

  const handlerBtnClick = (key: string): void => {
    setEventList([...eventList, { name: key, events: [] }]);
  };

  const getAddBtn = (): React.ReactElement => {
    const btnDropdownList =
      eventDocInfo?.filter(
        (item) => !eventList?.some((row) => row.name === item.type)
      ) ?? [];
    const hasMenu = btnDropdownList.length > 0;

    const btnMenu = (
      <Menu onClick={(e) => handlerBtnClick?.(e.key as string)}>
        {btnDropdownList.map((item) => (
          <Menu.Item key={item.type}>{item.type}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={btnMenu} trigger={["click"]} disabled={!hasMenu}>
        <Tooltip title={!hasMenu && t(K.NO_EVENTS_TO_ADD)}>
          <Button type="link" disabled={!hasMenu}>
            <FontAwesomeIcon className={styles.addIcon} icon="plus" />
          </Button>
        </Tooltip>
      </Dropdown>
    );
  };

  return (
    <EditorContext.Provider value={{ onCreate, onEdit }}>
      <div className={styles.titleWrapper}>
        <div className={styles.brickName}>
          <GeneralIcon
            icon={titleIcon}
            style={{ marginRight: 12 }}
          ></GeneralIcon>
          {customTitle}
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
              {item.name}

              <FontAwesomeIcon
                className={styles.plusIcon}
                icon="plus-square"
                onClick={() => onCreate(`${index}-events`, item.name)}
              />
            </div>

            <div className={styles.eventHandler}>
              {item.events.map((row, rowIndex) => (
                <HandlerItem
                  key={rowIndex}
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
        {getAddBtn()}
      </div>
    </EditorContext.Provider>
  );
}

export const EventsEditor = forwardRef(LegacyEventsEditor);
