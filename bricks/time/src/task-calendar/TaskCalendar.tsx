import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Calendar } from "antd";
import { Calendar } from "./Calendar";
import solarLunar from "solarlunar";
import moment, { Moment } from "moment";
import classNames from "classnames";
import styles from "./TaskCalendar.module.css";
import { min, isNil, isEmpty, get } from "lodash";
import {
  BriefData,
  TaskData,
  ImportantData,
  ImportanceSettings,
  TaskSettings,
  DateDetail,
} from "../interfaces";
import { ModeType } from "./utils";

export interface TaskCalendarProps {
  value?: string;
  defaultSelectedDate?: string;
  briefList?: BriefData[];
  taskList?: TaskData[];
  importantList?: ImportantData[];
  taskSettings?: TaskSettings;
  importanceSettings?: ImportanceSettings;
  footerStyle?: React.CSSProperties;
  dateCellHeight?: React.CSSProperties["height"];
  showLunarInfo?: boolean;
  mode?: ModeType;
  onDateSelect?: (detail: DateDetail) => void;
  onPickerPanelChange?: (detail: { mode: string; date: string }) => void;
}

export function TaskCalendar(props: TaskCalendarProps): React.ReactElement {
  const {
    briefList,
    taskList,
    importantList,
    importanceSettings,
    taskSettings,
    onDateSelect,
    onPickerPanelChange,
    value,
    defaultSelectedDate,
    footerStyle,
    dateCellHeight,
    showLunarInfo,
    mode,
  } = props;
  const [selectedData, setSelectedData] = useState<{
    date: Moment;
    data: DateDetail["data"];
  }>({} as any);

  const briefDataMap = useMemo(() => {
    return briefList?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.text;
      return pre;
    }, {} as Record<BriefData["date"], BriefData["text"]>);
  }, [briefList]);

  const taskDataMap = useMemo(() => {
    return taskList?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.task;
      return pre;
    }, {} as Record<TaskData["date"], TaskData["task"]>);
  }, [taskList]);

  const importantDataMap = useMemo(() => {
    return importantList?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.issues;
      return pre;
    }, {} as Record<ImportantData["date"], ImportantData["issues"]>);
  }, [importantList]);

  const pickerValue = useMemo(() => {
    return moment(value);
  }, [value]);

  useEffect(() => {
    const now = moment(defaultSelectedDate || value);
    const formatDate = now.format("YYYY-MM-DD");
    const curBriefData = briefDataMap?.[formatDate];
    const curTaskData = taskDataMap?.[formatDate];
    const curImportantData = importantDataMap?.[formatDate];
    const curData = {
      brief: curBriefData,
      task: curTaskData,
      importance: curImportantData,
    };
    setSelectedData({ date: now, data: curData });
  }, [briefDataMap, defaultSelectedDate, importantDataMap, taskDataMap, value]);

  const dateRender = useCallback(
    (date: Moment) => {
      let solar2lunarData;
      if (showLunarInfo) {
        solar2lunarData = solarLunar.solar2lunar(
          date.year(),
          date.month() + 1,
          date.date()
        );
      }
      const formatDate = date.format("YYYY-MM-DD");
      const curBriefData = briefDataMap?.[formatDate];
      const curTaskData = taskDataMap?.[formatDate];
      const curImportantData = importantDataMap?.[formatDate];
      const taskColor =
        taskSettings?.colorMap?.[
          min(
            curTaskData?.map((task) =>
              get(task, taskSettings?.fields?.priority)
            )
          )
        ];
      const importanceColor =
        importanceSettings?.colorMap?.[
          importanceSettings?.priority?.find((type) =>
            curImportantData?.includes(type)
          )
        ];
      return (
        <div
          className={classNames(styles.dateContainer, {
            [styles.importantDay]: !!importanceColor,
            [styles.today]: date.isSame(pickerValue, "date"),
          })}
          style={{
            borderColor: date.isSame(selectedData.date, "date")
              ? "var(--color-auxiliary-text)"
              : importanceColor,
            backgroundColor: importanceColor,
            height: dateCellHeight,
          }}
        >
          {curBriefData && (
            <div className={styles.briefText}>{curBriefData}</div>
          )}
          {!isNil(taskColor) && (
            <div
              className={styles.taskPoint}
              style={{
                backgroundColor: taskColor,
              }}
            ></div>
          )}
          <div className={styles.dateMain}>
            <div className={styles.dateNumber}>{date.date()}</div>
            {showLunarInfo && (
              <div className={styles.dateText}>{solar2lunarData.dayCn}</div>
            )}
          </div>
        </div>
      );
    },
    [
      briefDataMap,
      taskDataMap,
      importantDataMap,
      taskSettings,
      importanceSettings,
      selectedData,
      pickerValue,
      dateCellHeight,
      showLunarInfo,
    ]
  );

  const extraFooterNode = useMemo(() => {
    if (isEmpty(selectedData)) return;
    const {
      date,
      data: { importance, task },
    } = selectedData;
    return (
      <div className={styles.calendarFooter} style={footerStyle}>
        <div className={styles.dateInfo}>
          <div className={styles.dateText}>{date.format("LL")}</div>
          {importance?.length > 0 && !isEmpty(importanceSettings) && (
            <div>
              {importance?.map((issues) => (
                <span
                  className={styles.importantItem}
                  key={issues}
                  style={{
                    backgroundColor: importanceSettings.colorMap?.[issues],
                  }}
                >
                  {issues}
                </span>
              ))}
            </div>
          )}
        </div>
        {task?.length > 0 && !isEmpty(taskSettings) && (
          <div className={styles.taskInfo}>
            <div className={styles.taskTitle}>{taskSettings.taskTitle}</div>
            <div className={styles.taskList}>
              {task?.map((task: any, index: number) => {
                const taskTime = get(task, taskSettings.fields?.time);
                const { url } = task;
                return (
                  <div
                    className={classNames(styles.taskItem, {
                      [styles.taskLinkItem]: url,
                    })}
                    key={index}
                    onClick={(e) => {
                      url && window.open(url, "_blank");
                    }}
                  >
                    <div
                      className={styles.taskItemColor}
                      style={{
                        backgroundColor:
                          taskSettings.colorMap?.[
                            get(task, taskSettings.fields?.priority)
                          ],
                      }}
                    ></div>
                    {taskTime && (
                      <div className={styles.taskItemTime}>
                        {moment(taskTime).format("YYYY-MM-DD HH:mm")}
                      </div>
                    )}
                    <div className={styles.taskItemText}>
                      {get(task, taskSettings.fields?.summary)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }, [importanceSettings, selectedData, taskSettings, footerStyle]);

  const onSelect = useCallback(
    (date: Moment) => {
      const formatDate = date.format("YYYY-MM-DD");
      const curBriefData = briefDataMap?.[formatDate];
      const curTaskData = taskDataMap?.[formatDate];
      const curImportantData = importantDataMap?.[formatDate];
      const curData = {
        brief: curBriefData,
        task: curTaskData,
        importance: curImportantData,
      };
      setSelectedData({ date, data: curData });
      onDateSelect({
        date: formatDate,
        data: curData,
      });
    },
    [briefDataMap, importantDataMap, onDateSelect, taskDataMap]
  );

  const onPanelChange = useCallback(
    (date: Moment, mode: string) => {
      const formatDate = date.format("YYYY-MM-DD");
      onPickerPanelChange({ mode, date: formatDate });
    },
    [onPickerPanelChange]
  );

  return (
    <div className={styles.taskCalendar}>
      <Calendar
        dateFullCellRender={dateRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        defaultValue={pickerValue}
        panelMode={mode}
      />
      {extraFooterNode}
    </div>
  );
}
