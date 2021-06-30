import React, { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { Button, Input, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Clipboard } from "@next-libs/clipboard";

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
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  copyButton?: boolean;
  addonBefore?: string;
  addonAfter?: string;
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
  const { formElement, value, inputBoxStyle, copyButton, ...inputProps } =
    props;

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
    <Input value={value} style={inputBoxStyle} ref={ref} {...inputProps} />
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
