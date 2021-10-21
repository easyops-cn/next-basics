import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import {
  BugOutlined,
  CheckOutlined,
  CloseOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { DebuggerStateTestCase } from "../function-debugger-store/reducers/interfaces";

import styles from "./FunctionDebuggerSidebar.module.css";
import sharedStyles from "../shared/scrollbar.module.css";

export interface FunctionDebuggerSidebarProps {
  functionName: string;
  functionModified?: boolean;
  activeTab?: string;
  tests?: DebuggerStateTestCase[];
  onActiveTabSwitch?: (tab: string) => void;
  onRunAllTests?: () => void;
  onAddTest?: () => void;
}

export interface SidebarGroup {
  label: string;
  value: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  value: string;
  icon: ReactElement;
  className?: string;
  modified?: boolean;
}

export function FunctionDebuggerSidebar({
  functionName,
  functionModified,
  activeTab,
  tests,
  onActiveTabSwitch,
  onRunAllTests,
  onAddTest,
}: FunctionDebuggerSidebarProps): React.ReactElement {
  const [currentTab, setCurrentTab] = useState<string>(activeTab ?? "function");

  useEffect(() => {
    setCurrentTab(activeTab ?? "function");
  }, [activeTab]);

  const groups: SidebarGroup[] = useMemo(() => {
    const refinedTests = Array.isArray(tests) ? tests : [];
    return [
      {
        label: "Function",
        value: "function",
        items: [
          {
            label: functionName,
            value: "function",
            icon: <CodeOutlined />,
            modified: functionModified,
          },
        ],
      },
      {
        label: "Debug",
        value: "debug",
        items: [
          {
            label: "Debug",
            value: "debug",
            icon: <BugOutlined />,
          },
        ],
      },
      {
        label: `Tests (${refinedTests.length})`,
        value: "tests",
        items: refinedTests.map((test, index) => ({
          label: test.name ?? `Case ${index + 1}`,
          value: `test:${String(index)}`,
          modified: test.testModified,
          ...(test.testMatched
            ? {
                icon: <CheckOutlined />,
                className: styles.matched,
              }
            : test.testMatched === false
            ? {
                icon: <CloseOutlined />,
                className: styles.notMatched,
              }
            : {
                icon: <QuestionOutlined />,
              }),
        })),
      },
    ];
  }, [functionModified, functionName, tests]);

  const switchActiveTab = useCallback(
    (tab: string) => {
      if (currentTab !== tab) {
        setCurrentTab(tab);
        onActiveTabSwitch?.(tab);
      }
    },
    [currentTab, onActiveTabSwitch]
  );

  return (
    <div
      className={`${styles.sidebarContainer} ${sharedStyles.customScrollbarContainer}`}
      data-override-theme="dark"
    >
      <ul className={styles.sidebarGroups}>
        {groups.map((group) => (
          <li key={group.label}>
            <div className={styles.sidebarGroupLabel}>
              <span className={styles.groupText}>{group.label}</span>
              {group.value === "tests" && (
                <div className={styles.groupIconContainer}>
                  {group.items.length > 0 && (
                    <span
                      className={styles.groupIcon}
                      title="Run All Tests"
                      onClick={onRunAllTests}
                    >
                      <PlayCircleOutlined />
                    </span>
                  )}
                  <span
                    className={styles.groupIcon}
                    title="Run All Tests"
                    onClick={onAddTest}
                  >
                    <PlusCircleOutlined />
                  </span>
                </div>
              )}
            </div>
            <ul className={styles.sidebarItems}>
              {group.items.map((item) => (
                <li
                  key={item.label}
                  className={classNames({
                    [styles.active]: item.value === currentTab,
                  })}
                  onClick={() => switchActiveTab(item.value)}
                >
                  <span className={classNames(styles.icon, item.className)}>
                    {item.icon}
                  </span>
                  <span className={styles.text}>{item.label}</span>
                  {item.modified && <span className={styles.modified}></span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
