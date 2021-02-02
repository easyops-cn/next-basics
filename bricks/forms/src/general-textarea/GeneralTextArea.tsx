import React, { useRef } from "react";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
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
  disabled?: boolean;
  onChange?: (value: string) => void;
  onHandleBlur?: (value: string) => void;
  onHandleBlurV2?(data: BlurData): void;
}

export function GeneralTextArea(
  props: GeneralTextAreaProps
): React.ReactElement {
  const ref = useRef<TextArea>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    props.onChange?.(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    // istanbul ignore else
    if (ref.current?.resizableTextArea) {
      const {
        selectionStart,
        selectionEnd,
      } = ref.current.resizableTextArea.textArea;
      props.onHandleBlurV2({
        startPos: selectionStart,
        endPos: selectionEnd,
        startStr: e.target.value.substring(0, selectionStart),
        endStr: e.target.value.substring(selectionEnd),
        wholeStr: e.target.value,
      });
    }
    props.onHandleBlur?.(e.target.value);
  };

  return (
    <FormItemWrapper {...props}>
      <Input.TextArea
        ref={ref}
        autoSize={props.autoSize}
        disabled={props.disabled}
        value={props.name && props.formElement ? undefined : props.value}
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </FormItemWrapper>
  );
}
