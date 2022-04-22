import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import type { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import { WorkbenchMiniActionBar } from "../shared/workbench/WorkbenchMiniActionBar";
import { WorkbenchActionsContext } from "../shared/workbench/WorkbenchActionsContext";
import type {
  ActionClickDetail,
  TextIcon,
} from "../shared/workbench/interfaces";
import { WorkbenchTextIcon } from "../shared/workbench/WorkbenchTextIcon";

import styles from "./WorkbenchTabs.module.css";
import sharedStyles from "../shared/scrollbar.module.css";

export interface WorkbenchTabsProps {
  tabs?: WorkbenchTabConf[];
  activeTabKey?: string | number;
  historyBlocked?: boolean;
  onTabClose?(tab: WorkbenchTabConf): void;
  onTabClick?(tab: WorkbenchTabConf): void;
}

export interface WorkbenchTabConf {
  key: string | number;
  name: string;
  icon?: MenuIcon | TextIcon;
  type?: string;
}

export function WorkbenchTabs({
  tabs,
  activeTabKey,
  historyBlocked,
  onTabClose,
  onTabClick,
}: WorkbenchTabsProps): React.ReactElement {
  const onActionClick = useCallback(
    (detail: ActionClickDetail) => {
      onTabClose?.(detail.data as WorkbenchTabConf);
    },
    [onTabClose]
  );

  const [internalActiveTabKey, setInternalActiveTabKey] =
    useState(activeTabKey);

  useEffect(() => {
    setInternalActiveTabKey(activeTabKey);
  }, [activeTabKey]);

  const onTabClickFactory = useCallback(
    (tab: WorkbenchTabConf) => () => {
      if (!historyBlocked) {
        setInternalActiveTabKey(tab.key);
      }
      onTabClick?.(tab);
    },
    [historyBlocked, onTabClick]
  );

  // Only for initial active node.
  const initialActiveTabKey = useRef(activeTabKey).current;
  const activeTabCallback = useCallback((element: HTMLElement) => {
    // Let time flies.
    setTimeout(() => {
      element?.scrollIntoView({
        block: "center",
        inline: "center",
        // behavior: "smooth",
      });
    });
  }, []);

  return (
    <WorkbenchActionsContext.Provider
      value={{
        actions: [
          {
            action: "close",
            title: "Close",
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "close",
            },
          },
        ],
        onActionClick,
      }}
    >
      <div className={styles.scrollContainer}>
        <ul
          className={classNames(
            styles.tabs,
            sharedStyles.customScrollbarContainer
          )}
          role="menu"
        >
          {tabs?.map((tab) => (
            <li
              key={tab.key}
              className={classNames(styles.tab, {
                [styles.active]: tab.key === internalActiveTabKey,
              })}
              onClick={onTabClickFactory(tab)}
              role="menuitem"
              ref={tab.key === initialActiveTabKey ? activeTabCallback : null}
            >
              <span className={styles.tabIcon}>
                {tab.icon?.lib === "text" ? (
                  <WorkbenchTextIcon icon={tab.icon} />
                ) : (
                  <GeneralIcon icon={tab.icon} />
                )}
              </span>
              <span className={styles.tabName}>{tab.name}</span>
              {historyBlocked && tab.key === internalActiveTabKey ? (
                <span className={styles.modifiedIcon}></span>
              ) : (
                <WorkbenchMiniActionBar
                  className={styles.actionsBar}
                  data={tab}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </WorkbenchActionsContext.Provider>
  );
}
