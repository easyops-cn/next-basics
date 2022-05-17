import React, { useState, useEffect } from "react";
import _ from "lodash";
import { MenuIcon } from "@next-core/brick-types";
import { useTranslation } from "react-i18next";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { VisitHistory } from "@next-libs/visit-history";

import styles from "./WorkbenchQuickEntry.module.css";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import classNames from "classnames";

export interface listItem {
  icon?: MenuIcon;
  text: string;
  to: string;
  thumbnail?: string;
}

export interface historyProps {
  namespace: string;
  property: string;
  fields?: {
    label: string;
    compareSourceProperty?: string;
  };
  visitCountLimit?: number;
  compareSource?: Record<string, any>[];
}

interface WorkbenchQuickEntryProps {
  entryTitle: string;
  entryList?: Array<listItem>;
  showThumbnails?: boolean;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  moreButtonText?: string;
  showMoreButton?: boolean;
  history?: historyProps;
  onMoreButtonClick?: () => void;
}

export function WorkbenchQuickEntry({
  entryTitle,
  entryList,
  history,
  moreButtonText,
  showMoreButton,
  showThumbnails,
  thumbnailWidth,
  thumbnailHeight,
  onMoreButtonClick,
}: WorkbenchQuickEntryProps): React.ReactElement {
  const [list, setList] = useState(entryList);
  const { t } = useTranslation(NS_NEXT_BUILDER);

  useEffect(() => {
    setList(entryList);
  }, [entryList]);

  useEffect(() => {
    if (history) {
      const labelFields =
        (history.fields && history.fields.label) || history.property;
      const visitHistory = new VisitHistory(
        history.namespace,
        history.property,
        {
          maxRecords: history.visitCountLimit ?? 5,
        }
      );
      if (!_.isNil(history.compareSource)) {
        // remove invalid values
        const compareSourceProperty =
          (history.fields && history.fields.compareSourceProperty) ||
          history.property;
        const allHistoryValues = _.map(visitHistory.all(), history.property);
        const compareSourceValues = _.map(
          history.compareSource,
          compareSourceProperty
        );
        const removeItems = _.filter(allHistoryValues, (item) => {
          return !compareSourceValues.includes(item);
        });
        visitHistory.remove(removeItems);
      }

      const visitList = visitHistory.latest(history.visitCountLimit ?? 5);
      setList(
        visitList.map((item: any) => ({
          text: _.get(item, labelFields),
          ...item,
        }))
      );
    }
  }, [history]);

  return (
    <div
      className={classNames(styles.quickEntryWrapper, {
        [styles.showThumbnails]: showThumbnails,
      })}
    >
      <div className={styles.title}>{entryTitle}</div>
      <div className={styles.entryList}>
        {list?.map((item, index) => (
          <QuickEntryItem
            item={item}
            showThumbnails={showThumbnails}
            thumbnailWidth={thumbnailWidth}
            thumbnailHeight={thumbnailHeight}
            key={index}
          />
        ))}
      </div>
      {showMoreButton && (
        <div
          className={styles.moreButton}
          onClick={() => onMoreButtonClick?.()}
          role="button"
        >
          {moreButtonText ?? `${t(K.MORE)}...`}
        </div>
      )}
    </div>
  );
}

interface QuickEntryItemProps {
  item: listItem;
  showThumbnails?: boolean;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

function QuickEntryItem({
  item,
  showThumbnails,
  thumbnailWidth,
  thumbnailHeight,
}: QuickEntryItemProps): React.ReactElement {
  return (
    <Link
      to={item.to}
      className={styles.entry}
      style={{ width: thumbnailWidth }}
    >
      {showThumbnails ? (
        <>
          <span className={styles.label}>{item.text}</span>
          <span
            className={styles.thumbnail}
            style={{ height: thumbnailHeight }}
          >
            {item.thumbnail ? (
              <img src={item.thumbnail} />
            ) : (
              <span className={styles.thumbnailPlaceholder}>
                <GeneralIcon
                  icon={{ lib: "antd", icon: "picture", theme: "outlined" }}
                />
              </span>
            )}
          </span>
        </>
      ) : (
        <>
          {item.icon && <GeneralIcon icon={item.icon} />}
          {item.text}
        </>
      )}
    </Link>
  );
}
