import React from "react";
import { Link } from "@next-libs/basic-components";
import { Parser } from "html-to-react";
import Icon from "@ant-design/icons";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Card, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";

import styles from "./StatisticCard.module.css";
import classNames from "classnames";

export type IconType = "antd" | "fa" | "svg";

interface StatisticCardProps {
  title: string;
  value?: string | number;
  icon: MenuIcon | string;
  iconType?: IconType;
  url?: string;
  tip?: string;
  disabled?: boolean;
  showCard?: boolean;
}

export function StatisticCard(props: StatisticCardProps): React.ReactElement {
  const { title, value, icon, iconType, url, tip, disabled, showCard } = props;

  const getIconNode = () => {
    switch (iconType) {
      case "fa":
        return <i className={`fa ${icon}`} />;
      case "svg": {
        const parser = new Parser();
        return (
          <Icon
            component={(props) => {
              const { children, ...iconProps } = props;

              return React.cloneElement(
                parser.parse(icon as string),
                iconProps
              );
            }}
          />
        );
      }
      case "antd":
      default:
        return <LegacyIcon type={icon as string} />;
    }
  };

  const getContentNode = () => (
    <div
      className={classNames(styles.statisticCardContentContainer, {
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.statisticCardContent}>
        <div className={styles.statisticCardValue}>
          {value !== undefined ? value : "-"}
        </div>
        <div className={styles.statisticCardTitle}>{title}</div>
      </div>
      {iconType ? (
        <div className={styles.statisticCardIcon}>{getIconNode()}</div>
      ) : (
        <div className={styles.statisticCardIcon}>
          <GeneralIcon icon={icon as MenuIcon}></GeneralIcon>
        </div>
      )}
    </div>
  );

  const getStatisticCardNode = (hoverable = false) => {
    const node = showCard ? (
      <Card
        className={styles.statisticCard}
        bordered={false}
        hoverable={hoverable}
      >
        {getContentNode()}
      </Card>
    ) : (
      getContentNode()
    );

    return tip ? <Tooltip title={tip}>{node}</Tooltip> : node;
  };

  return url && !disabled ? (
    <Link to={url}>{getStatisticCardNode(true)}</Link>
  ) : (
    getStatisticCardNode()
  );
}
