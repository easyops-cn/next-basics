import React, { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { Button, Input, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Clipboard } from "@next-libs/clipboard";

export enum widthSize {
  XS = "104px",
  S = "216px",
  M = "328px",
  L = "440px",
  XL = "552px",
}
interface InputGroupProps
  extends Omit<
    FormItemWrapperProps,
    | "onBlur"
    | "onKeyDown"
    | "onKeyUp"
    | "onPressEnter"
    | "onMouseEnter"
    | "onMouseLeave"
  > {
  type?: string;
  placeholder?: string;
  value?: string;
  size?: widthSize;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  copyButton?: boolean;
  addonBefore?: string;
  addonAfter?: string;
  allowClear?: boolean;
  onChange?: (vevent: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface GeneralInputProps
  extends Omit<InputGroupProps, "onChange" | "onBlur"> {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const InputGroup = forwardRef<Input, InputGroupProps>(function InputGroup(
  props,
  ref
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const {
    formElement,
    value,
    inputBoxStyle,
    size,
    copyButton,
    allowClear,
    ...inputProps
  } = props;

  const handleCopy = (text: string, success: boolean) => {
    if (success) {
      message.success(t(K.COPY_SUCCESS));
    }
  };

  const getCopyButton = (): React.ReactElement => {
    return (
      <Clipboard text={value} onCopy={handleCopy}>
        <Button icon={<CopyOutlined />} />
      </Clipboard>
    );
  };

  const input = (
    <Input
      value={value}
      style={inputBoxStyle ?? { width: widthSize[size] }}
      ref={ref}
      allowClear={allowClear}
      {...inputProps}
    />
  );

  return copyButton ? (
    <Input.Group compact style={{ display: "flex" }}>
      {input}
      {getCopyButton()}
    </Input.Group>
  ) : (
    input
  );
});

export function GeneralInput(props: GeneralInputProps): React.ReactElement {
  const { onChange, onBlur } = props;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ): void => {
    onChange?.(typeof e === "string" ? e : e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    onBlur?.(e.target.value);
  };

  return (
    <FormItemWrapper {...props}>
      <InputGroup {...props} onChange={handleChange} onBlur={handleBlur} />
    </FormItemWrapper>
  );
}
