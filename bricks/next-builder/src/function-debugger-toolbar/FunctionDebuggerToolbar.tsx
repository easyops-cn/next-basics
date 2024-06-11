import React, { useCallback } from "react";
import { Tooltip } from "antd";
import classNames from "classnames";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  QuestionOutlined,
  BugOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import styles from "./FunctionDebuggerToolbar.module.css";

export interface FunctionDebuggerToolbarProps {
  type?: "input" | "debugging-input" | "output" | "test-input" | "test-output";
  status?: "ok" | "failed" | null;
  saveDisabled?: boolean;
  debuggable?: boolean;
  onButtonClick?: (detail: { action: string }) => void;
}

export function FunctionDebuggerToolbar({
  type,
  status,
  saveDisabled,
  debuggable,
  onButtonClick,
}: FunctionDebuggerToolbarProps): React.ReactElement {
  const refinedType = type ?? "input";
  const isInput = refinedType === "input" || refinedType === "test-input";
  const isDebuggingInput = refinedType === "debugging-input";

  const handleRunClick = useCallback(() => {
    onButtonClick?.({ action: "run" });
  }, [onButtonClick]);

  const handleDebugClick = useCallback(() => {
    onButtonClick?.({ action: "debug" });
  }, [onButtonClick]);

  const handleDebugContinueClick = useCallback(() => {
    onButtonClick?.({ action: "debug-continue" });
  }, [onButtonClick]);

  const handleDebugStepClick = useCallback(() => {
    onButtonClick?.({ action: "debug-step" });
  }, [onButtonClick]);

  const handleDebugDisconnectClick = useCallback(() => {
    onButtonClick?.({ action: "debug-disconnect" });
  }, [onButtonClick]);

  const handleSaveClick = useCallback(() => {
    if (!saveDisabled) {
      onButtonClick?.({ action: "save" });
    }
  }, [onButtonClick, saveDisabled]);

  const handleDeleteClick = useCallback(() => {
    onButtonClick?.({ action: "delete" });
  }, [onButtonClick]);

  return (
    <div
      className={classNames(
        styles.debuggerToolbar,
        status && styles[status],
        refinedType === "input" || refinedType === "output" || isDebuggingInput
          ? styles.debug
          : styles.test,
        isInput || isDebuggingInput ? styles.input : styles.output
      )}
      data-override-theme="dark"
    >
      <div className={styles.header}>
        {refinedType === "input" || isDebuggingInput
          ? "Input"
          : refinedType === "test-input"
          ? "Test Input"
          : refinedType === "test-output"
          ? "Expect Output"
          : "Output"}
        {(isInput || isDebuggingInput) && (
          <span className={styles.headerSuffix}>
            &nbsp;(argument list in JSON format)
          </span>
        )}
      </div>
      {isInput ? (
        <div className={styles.buttons}>
          {debuggable && (
            <Tooltip title="Debug">
              <div className={styles.debuggerButton} onClick={handleDebugClick}>
                <BugOutlined />
              </div>
            </Tooltip>
          )}
          <Tooltip title="Run">
            <div className={styles.debuggerButton} onClick={handleRunClick}>
              <PlayCircleOutlined />
            </div>
          </Tooltip>
          <Tooltip
            title={refinedType === "input" ? "Add as a test case" : "Update"}
          >
            <div
              className={classNames(styles.debuggerButton, {
                [styles.disabled]: saveDisabled,
              })}
              onClick={handleSaveClick}
            >
              {refinedType === "input" ? (
                <PlusCircleOutlined />
              ) : (
                <SaveOutlined />
              )}
            </div>
          </Tooltip>
          {refinedType === "test-input" && (
            <Tooltip title="Delete">
              <div
                className={styles.debuggerButton}
                onClick={handleDeleteClick}
              >
                <DeleteOutlined />
              </div>
            </Tooltip>
          )}
        </div>
      ) : isDebuggingInput ? (
        <div className={styles.buttons}>
          <Tooltip title="Continue">
            <div
              className={styles.debuggerButton}
              onClick={handleDebugContinueClick}
            >
              <span className="codicon codicon-debug-continue" />
            </div>
          </Tooltip>
          <Tooltip title="Step">
            <div
              className={styles.debuggerButton}
              onClick={handleDebugStepClick}
            >
              <span className="codicon codicon-debug-step-over" />
            </div>
          </Tooltip>
          <Tooltip title="Disconnect">
            <div
              className={styles.debuggerButton}
              onClick={handleDebugDisconnectClick}
            >
              <span className="codicon codicon-debug-disconnect" />
            </div>
          </Tooltip>
        </div>
      ) : (
        refinedType === "test-output" && (
          <div className={styles.secondHeader}>
            {status === "ok" ? (
              <>
                <span className={styles.secondHeaderIcon}>
                  <CheckOutlined />
                </span>
                <span>Test: passed</span>
              </>
            ) : status === "failed" ? (
              <>
                <span className={styles.secondHeaderIcon}>
                  <CloseOutlined />
                </span>
                <span>Test: failed</span>
              </>
            ) : (
              <>
                <span className={styles.secondHeaderIcon}>
                  <QuestionOutlined />
                </span>
                <span>Test: expired</span>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}
