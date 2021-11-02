import React from "react";
import moment from "moment";
import { get, pick } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { Timeline, Card } from "antd";
import { TimelineBaseCard, TimelineExtensionCard } from "./TimelineCard";
import { groupByMoth } from "./processor";
import style from "./index.module.css";
import { StatusColor, TimelineItem } from "./index";

export type TimeType = "second" | "default";

export type ItemProps = TimelineItem | Record<string, any>;

export interface BrickTimelineProps {
  itemList: ItemProps[];
  useBrick?: UseBrickConf;
  statusMap?: Record<string, StatusColor>;
  type?: "base" | "extension";
  timeType?: TimeType;
  showCard?: boolean;
  mode?: "left" | "right" | "alternate";
  onClick?: (data: ItemProps) => void;
}

export function BrickTimeline(props: BrickTimelineProps): React.ReactElement {
  const getGeneralProps = React.useCallback(
    (item: TimelineItem): Omit<TimelineItem, "status" | "time"> =>
      pick(item, ["title", "description", "link"]),
    []
  );

  const renderTimeline = (list: ItemProps[] = []): React.ReactElement => {
    const existedDateTime: Record<string, boolean> = {};
    return (
      <Timeline
        mode={props.useBrick ? props.mode : "left"}
        className={style.brickTimeline}
      >
        {list?.map((item, index) => {
          // 根据不同时间类型统一转化为时间戳处理
          let timestamp: moment.Moment;
          if (props.timeType === "second") {
            timestamp = moment(item.time * 1000);
          } else {
            timestamp = moment(item.time);
          }

          // 判断该时间点对应的日期是否首次出现，是的话需要显示在时间轴左侧
          let showLeftDate: boolean;
          const date = moment(timestamp).format("YYYY-MM-DD");
          if (!existedDateTime[date]) {
            showLeftDate = true;
            existedDateTime[date] = true;
          }

          return (
            <Timeline.Item
              key={index}
              color={get(props.statusMap, item.status)}
            >
              {props.useBrick ? (
                <BrickAsComponent
                  useBrick={props.useBrick}
                  data={{ item, index, list: props.itemList }}
                />
              ) : props.type === "extension" ? (
                <TimelineExtensionCard
                  {...getGeneralProps(item as TimelineItem)}
                  timestamp={timestamp}
                  showLeftDate={showLeftDate}
                  onClick={props.onClick}
                  itemData={item}
                />
              ) : (
                <TimelineBaseCard
                  {...getGeneralProps(item as TimelineItem)}
                  timestamp={timestamp}
                  onClick={props.onClick}
                  itemData={item}
                />
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>
    );
  };

  const getComponent = (): React.ReactElement => {
    if (props.type === "extension") {
      // 根据月份分组
      const timelineGroup = groupByMoth(props.itemList, props.timeType);
      return (
        <>
          {timelineGroup.map((item) => (
            <div key={item.groupName}>
              <div className={style.groupName}>{item.groupName}</div>
              {renderTimeline(item.list)}
            </div>
          ))}
        </>
      );
    } else {
      return renderTimeline(props.itemList);
    }
  };

  return props.showCard ? <Card>{getComponent()}</Card> : getComponent();
}
