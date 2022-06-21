import React from "react";
import { MenuIcon } from "@next-core/brick-types";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { Card, Avatar, Tooltip } from "antd";
import classNames from "classnames";
import styles from "./EntryCardItem.module.css";

export type Color =
  | "purple"
  | "red"
  | "softOrange"
  | "cyan"
  | "blue"
  | "darkPurple"
  | "lightCyan"
  | "brightOrange"
  | "white";

interface EntryCardItemProps {
  cardTitle?: string;
  icon?: MenuIcon;
  url?: string;
  iconColor?: Color;
  target?: string;
  showCard?: boolean;
  description?: string;
  cardStyle?: React.CSSProperties;
  hoverHighLight?: boolean;
  disabled?: boolean;
  tip?: string;
}

export function EntryCardItem(props: EntryCardItemProps): React.ReactElement {
  const { cardStyle, description, hoverHighLight } = props;
  // 卡片图标
  const cardIcon = (
    <div className={styles.cardIcon}>
      <GeneralIcon icon={props.icon} />
    </div>
  );
  // 卡片图标带圆底
  const avatarIcon = (size: number): React.ReactElement => (
    <Avatar
      icon={cardIcon}
      size={size}
      className={classNames(
        styles.cardAvatar,
        props.iconColor && styles[props.iconColor]
      )}
    ></Avatar>
  );

  const contentNode = (
    <div className={styles.cardContent}>
      {avatarIcon(56)}
      <div
        className={classNames(styles.textContainer, {
          [styles.hoverHighLight]: hoverHighLight,
        })}
      >
        <div className={styles.cardTitle}>{props.cardTitle}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );

  const cardNode = props.showCard ? (
    <Card
      hoverable
      className={styles.cardItem}
      bodyStyle={{ padding: 0 }}
      style={{ width: 126, ...cardStyle }}
    >
      {contentNode}
    </Card>
  ) : (
    contentNode
  );
  const tipNode = props.tip ? (
    <Tooltip title={props.tip}>{cardNode}</Tooltip>
  ) : (
    cardNode
  );

  const link = props.target ? (
    <Link target={props.target} href={props.url}>
      {tipNode}
    </Link>
  ) : (
    <Link to={props.url}>{tipNode}</Link>
  );

  return <>{props.url && !props.disabled ? link : tipNode}</>;
}
