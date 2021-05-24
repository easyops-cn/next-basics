import React from "react";
import { Button, Tooltip } from "antd";
import { ButtonType } from "antd/lib/button";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import classNames from "classnames";

import styles from "./GeneralButtons.module.css";

interface GeneralButtonsProps extends FormItemWrapperProps {
  submitText?: string;
  submitType?: ButtonType;
  submitDisabled?: boolean;
  submitTooltip?: string;
  cancelText?: string;
  cancelType?: ButtonType;
  onSubmitClick?: (event: React.MouseEvent) => void;
  onCancelClick?: (event: React.MouseEvent) => void;
  showCancelButton?: boolean;
}

export function GeneralButtons(props: GeneralButtonsProps): React.ReactElement {
  return (
    <FormItemWrapper
      {...props}
      className={classNames(styles.formButtons, {
        [styles.isFormElement]: props.formElement?.layout === "horizontal",
      })}
    >
      <Tooltip title={props.submitTooltip}>
        <Button
          disabled={props.submitDisabled}
          type={props.submitType}
          onClick={props.onSubmitClick}
          style={{ marginRight: "8px" }}
          data-testid="submit-button"
        >
          {props.submitText}
        </Button>
      </Tooltip>
      {props.showCancelButton && (
        <Button
          type={props.cancelType}
          onClick={props.onCancelClick}
          data-testid="cancel-button"
        >
          {props.cancelText}
        </Button>
      )}
    </FormItemWrapper>
  );
}
