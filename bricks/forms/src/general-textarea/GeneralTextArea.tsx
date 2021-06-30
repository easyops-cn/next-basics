import React, { useRef } from "react";
import { Input } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

export interface BlurData {
  startPos: number;
  endPos: number;
  startStr: string;
  endStr: string;
  wholeStr: string;
}

interface GeneralTextAreaProps extends FormItemWrapperProps {
  placeholder?: string;
  value?: string;
  autoSize?: boolean | AutoSizeType;
  readOnly?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
  onHandleBlur?: (value: string) => void;
  onHandleBlurV2?(data: BlurData): void;
}

export function GeneralTextArea(
  props: GeneralTextAreaProps
): React.ReactElement {
  const {
    inputBoxStyle,
    autoSize,
    readOnly,
    disabled,
    value,
    placeholder,
    onChange,
    onHandleBlur,
    onHandleBlurV2,
  } = props;
  const ref = useRef<TextAreaRef>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    onChange?.(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    // istanbul ignore else
    if (ref.current?.resizableTextArea) {
      const { selectionStart, selectionEnd } =
        ref.current.resizableTextArea.textArea;
      onHandleBlurV2?.({
        startPos: selectionStart,
        endPos: selectionEnd,
        startStr: e.target.value.substring(0, selectionStart),
        endStr: e.target.value.substring(selectionEnd),
        wholeStr: e.target.value,
      });
    }
    onHandleBlur?.(e.target.value);
  };

  return (
    <FormItemWrapper {...props}>
      <Input.TextArea
        ref={ref}
        style={inputBoxStyle}
        autoSize={autoSize}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </FormItemWrapper>
  );
}
