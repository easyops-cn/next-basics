import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Checkbox } from "antd";
import classNames from "classnames";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  QuestionOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import styles from "./FunctionDebuggerToolbarV2.module.css";

export interface FunctionDebuggerToolbarProps {
  type?: "input" | "output" | "test-input" | "test-output";
  status?: "ok" | "failed" | null;
  saveDisabled?: boolean;
  wantErrCheckStatus?: boolean;
  onButtonClick?: (detail: { action: string }) => void;
  onCheckboxCheck?: (checked: boolean) => void;
}

export function FunctionDebuggerToolbarV2({
  type,
  status,
  saveDisabled,
  wantErrCheckStatus,
  onButtonClick,
  onCheckboxCheck,
}: FunctionDebuggerToolbarProps): React.ReactElement {
  const refinedType = type ?? "input";
  const isInput = refinedType === "input" || refinedType === "test-input";
  const [wantErrChecked, setWantErrChecked] = useState(false);

  useEffect(() => {
    setWantErrChecked(wantErrCheckStatus ?? false);
  }, [wantErrCheckStatus]);

  const handleRunClick = useCallback(() => {
    onButtonClick?.({ action: "run" });
  }, [onButtonClick]);

  const handleSaveClick = useCallback(() => {
    if (!saveDisabled) {
      onButtonClick?.({ action: "save" });
    }
  }, [onButtonClick, saveDisabled]);

  const handleDeleteClick = useCallback(() => {
    onButtonClick?.({ action: "delete" });
  }, [onButtonClick]);

  const handleCheckboxCheck = useCallback(
    (e: Record<string, any>) => {
      onCheckboxCheck?.(e.target.checked);
    },
    [onButtonClick]
  );

  return (
    <div
      className={classNames(
        styles.debuggerToolbar,
        status && styles[status],
        refinedType === "input" || refinedType === "output"
          ? styles.debug
          : styles.test,
        isInput ? styles.input : styles.output
      )}
      data-override-theme="dark"
    >
      <div className={styles.header}>
        {refinedType === "input"
          ? "Input"
          : refinedType === "test-input"
          ? "Test Input"
          : refinedType === "test-output"
          ? "Expect Output"
          : "Output"}
        {isInput && (
          <span className={styles.headerSuffix}>
            &nbsp;(argument list in JSON format)
          </span>
        )}
        {refinedType === "test-output" && (
          <span
            className={classNames(
              styles.headerSuffix,
              styles.headerSuffixCheckboxContainer
            )}
          >
            <label>
              Expect Error
              <Checkbox
                className={styles.headerSuffixCheckbox}
                onChange={handleCheckboxCheck}
                checked={wantErrChecked}
              />
            </label>
          </span>
        )}
      </div>
      {isInput ? (
        <div className={styles.buttons}>
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
