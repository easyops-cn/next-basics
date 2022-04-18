import React, { useState, useEffect } from "react";
import _ from "lodash";
import { MenuIcon } from "@next-core/brick-types";
import { useTranslation } from "react-i18next";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { VisitHistory } from "@next-libs/visit-history";

import styles from "./WorkbenchQuickEntry.module.css";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";

export interface listItem {
  icon?: MenuIcon;
  text: string;
  to: string;
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
  moreButtonText?: string;
  onMoreButtonClick?: () => void;
  isShowMoreButton?: boolean;
  history?: historyProps;
}

export function WorkbenchQuickEntry(
  props: WorkbenchQuickEntryProps
): React.ReactElement {
  const {
    entryTitle,
    entryList,
    history,
    moreButtonText,
    isShowMoreButton,
    onMoreButtonClick,
  } = props;
  const [list, setList] = useState(entryList);
  const { t } = useTranslation(NS_NEXT_BUILDER);

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
    <div className={styles.quickEntryWrapper}>
      <div className={styles.title}>{entryTitle}</div>
      <div className={styles.entryList}>
        {list?.map((item, index) => {
          return (
            <Link to={item.to} key={index}>
              {item.icon && <GeneralIcon icon={item.icon} />}
              {item.text}
            </Link>
          );
        })}
      </div>
      {isShowMoreButton && (
        <div
          className={styles.moreButton}
          onClick={() => onMoreButtonClick?.()}
        >
          {moreButtonText ?? `${t(K.MORE)}...`}
        </div>
      )}
    </div>
  );
}
