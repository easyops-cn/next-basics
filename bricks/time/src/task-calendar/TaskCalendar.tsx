import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PickerPanel } from "rc-picker";
import zhCN from "rc-picker/lib/locale/zh_CN";
import solarLunar from "solarlunar";
import moment, { Moment } from "moment";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import classNames from "classnames";
import styles from "./TaskCalendar.module.css";
import { min, isNil, get } from "lodash";
import {
  BriefData,
  TaskData,
  ImportantData,
  ImportanceSettings,
  TaskSettings,
} from "../interfaces";

const prefixCls = "devops-calendar";

export interface TaskCalendarProps {
  value?: string;
  displayDate?: string;
  defaultSelectedDate?: string;
  briefData?: BriefData[];
  taskData?: TaskData[];
  importantData?: ImportantData[];
  taskSettings?: TaskSettings;
  importanceSettings?: ImportanceSettings;
  onDateSelect?: (detail: { date: string; data: Record<string, any> }) => void;
  onPickerPanelChange?: (detail: { mode: string; date: string }) => void;
}

export function TaskCalendar(props: TaskCalendarProps): React.ReactElement {
  const {
    briefData,
    taskData,
    importantData,
    importanceSettings,
    taskSettings,
    onDateSelect,
    onPickerPanelChange,
    value,
    displayDate,
    defaultSelectedDate,
  } = props;
  const [selectedData, setSelectedData] = useState<{
    date?: Moment;
    data?: { brief: any; task: any; importance: any };
  }>({});

  const briefDataMap = useMemo(() => {
    return briefData?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.text;
      return pre;
    }, {} as Record<string, string>);
  }, [briefData]);

  const taskDataMap = useMemo(() => {
    return taskData?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.task;
      return pre;
    }, {} as Record<string, any[]>);
  }, [taskData]);

  const importantDataMap = useMemo(() => {
    return importantData?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.issues;
      return pre;
    }, {} as Record<string, any[]>);
  }, [importantData]);

  const pickerValue = useMemo(() => {
    return moment(displayDate || value);
  }, [displayDate, value]);

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
    (date: Moment, today: Moment) => {
      const solar2lunarData = solarLunar.solar2lunar(
        date.year(),
        date.month() + 1,
        date.date()
      );
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
            [styles.today]: date.isSame(value || today, "date"),
          })}
          style={{
            borderColor: date.isSame(selectedData?.date, "date")
              ? "#666"
              : importanceColor,
            backgroundColor: importanceColor,
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
            <div className={styles.dateText}>{solar2lunarData?.dayCn}</div>
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
      value,
      selectedData,
    ]
  );

  const renderExtraFooter = useCallback(
    (mode: string) => {
      return (
        <div className={styles.dateFooter}>
          <div className={styles.dateInfo}>
            <div className={styles.dateText}>
              {selectedData?.date?.format("YYYY[年]MM[月]DD[日]")}
            </div>
            <div>
              {selectedData?.data?.importance?.map((issues) => (
                <span
                  className={styles.importantItem}
                  key={issues}
                  style={{
                    backgroundColor: importanceSettings?.colorMap?.[issues],
                  }}
                >
                  {issues}
                </span>
              ))}
            </div>
          </div>
          {selectedData?.data?.task?.length > 0 && (
            <div className={styles.taskInfo}>
              <div className={styles.taskTitle}>{taskSettings?.taskTitle}</div>
              <div className={styles.taskList}>
                {selectedData.data.task?.map((task: any, index: number) => {
                  const taskTime = get(task, taskSettings?.fields?.time);
                  return (
                    <div className={styles.taskItem} key={index}>
                      <div
                        className={styles.taskItemColor}
                        style={{
                          backgroundColor:
                            taskSettings?.colorMap?.[
                              get(task, taskSettings?.fields?.priority)
                            ],
                        }}
                      ></div>
                      {taskTime && (
                        <div className={styles.taskItemTime}>
                          {moment(taskTime).format("YYYY-MM-DD HH:mm")}
                        </div>
                      )}
                      <div className={styles.taskItemText}>
                        {get(task, taskSettings?.fields?.summary)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    },
    [importanceSettings, selectedData, taskSettings]
  );

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
      onDateSelect?.({
        date: formatDate,
        data: curData,
      });
    },
    [briefDataMap, importantDataMap, onDateSelect, taskDataMap]
  );

  const onPanelChange = useCallback(
    (date: Moment, mode: string) => {
      const formatDate = date.format("YYYY-MM-DD");
      onPickerPanelChange?.({ mode, date: formatDate });
    },
    [onPickerPanelChange]
  );

  return (
    <PickerPanel
      prefixCls={prefixCls}
      locale={zhCN}
      picker={"date"}
      generateConfig={momentGenerateConfig}
      prevIcon={<span className={styles.prevIcon} />}
      nextIcon={<span className={styles.nextIcon} />}
      superPrevIcon={<span className={styles.superPrevIcon} />}
      superNextIcon={<span className={styles.superNextIcon} />}
      dateRender={dateRender}
      renderExtraFooter={renderExtraFooter}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      className={styles.taskCalendar}
      style={{ width: "100%" }}
      value={pickerValue}
    />
  );
}
