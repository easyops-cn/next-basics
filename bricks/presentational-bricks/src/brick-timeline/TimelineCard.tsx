import React from "react";
import moment from "moment";
import { Link } from "@next-libs/basic-components";
import classNames from "classnames";
import style from "./index.module.css";
import { ItemProps } from "./BrickTimeline";

export interface TimelineCardProps {
  title: string;
  description: string;
  timestamp: moment.Moment;
  link?: string;
  showLeftDate?: boolean;
  highlight?: boolean;
  itemData?: ItemProps;
  onClick?: (data: ItemProps) => void;
}

function getTitle(props: TimelineCardProps): React.ReactElement {
  const { title, link, onClick } = props;
  return link ? (
    <Link to={link} className={style.link}>
      {title}
    </Link>
  ) : (
    <span className={style.link} onClick={() => onClick?.(props.itemData)}>
      {title}
    </span>
  );
}

export function TimelineBaseCard(props: TimelineCardProps): React.ReactElement {
  const { description, timestamp, highlight } = props;

  return (
    <div className={style.itemContainer}>
      <div className={style.leftArea}>
        <p
          className={classNames(style.title, { [style.highlight]: highlight })}
        >
          {getTitle(props)}
        </p>
        <p className={style.description}>{description}</p>
        <p className={style.dateTime}>{timestamp.format("YYYY/MM/DD HH:mm")}</p>
      </div>
    </div>
  );
}

export function TimelineExtensionCard(
  props: TimelineCardProps
): React.ReactElement {
  const { description, timestamp, showLeftDate, highlight } = props;
  return (
    <div className={style.itemContainer} style={{ position: "relative" }}>
      <div className={style.leftArea}>
        <p
          className={classNames(style.title, { [style.highlight]: highlight })}
        >
          {getTitle(props)}
        </p>
        <p className={style.description}>{description}</p>
      </div>

      <div className={style.rightArea}>
        <span className={style.time}>{timestamp.format("HH:mm:ss")}</span>
        {showLeftDate && (
          <div className={style.dateContainer}>
            <p className={style.month}>{timestamp.month() + 1}月</p>
            <p className={style.day}>{timestamp.date()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
