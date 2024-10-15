import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { ObjectStoreApi_putObject } from "@next-sdk/object-store-sdk";

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
  pasteImageBucketName?: string;
  onChange?: (value: string) => void;
  onHandleBlur?: (value: string) => void;
  onHandleBlurV2?(data: BlurData): void;
}

export function GeneralTextArea(
  props: GeneralTextAreaProps
): React.ReactElement {
  const {
    formElement,
    name,
    inputBoxStyle,
    autoSize,
    readOnly,
    disabled,
    value: propValue,
    placeholder,
    pasteImageBucketName,
    onChange,
    onHandleBlur,
    onHandleBlurV2,
  } = props;

  const { setFieldsValue } = formElement?.formUtils ?? {};
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const ref = useRef<TextAreaRef>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
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

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const key =
      e.key || e.keyCode || /* istanbul ignore next: compatibility */ e.which;
    if (["Tab", 9].includes(key)) {
      e.preventDefault();
      const { selectionStart, selectionEnd } =
        ref.current.resizableTextArea.textArea;
      ref.current.resizableTextArea.textArea.setRangeText(
        "\t",
        selectionStart,
        selectionEnd,
        "end"
      );
    }
  };

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      if (!pasteImageBucketName) {
        return;
      }

      const updateValue = (placeholder: string, replacement: string): void => {
        setValue((prev) => {
          const newValue = prev.replace(placeholder, replacement);
          if (prev !== newValue) {
            setFieldsValue?.({ [name]: newValue });
            onChange?.(newValue);
            return newValue;
          }
          return prev;
        });
      };

      for (const item of e.clipboardData.items) {
        const file = item.getAsFile();
        if (file?.type.startsWith("image/")) {
          e.preventDefault();
          const filename = file.name ?? "image";
          const placeholder = `![Uploading ${filename}…]()`;
          const { selectionStart, selectionEnd } =
            e.target as HTMLTextAreaElement;
          const newValue = value
            ? value.substring(0, selectionStart) +
              placeholder +
              value.substring(selectionEnd)
            : placeholder;
          setValue(newValue);
          setFieldsValue?.({ [name]: newValue });
          onChange?.(newValue);
          try {
            const response = await ObjectStoreApi_putObject(
              pasteImageBucketName,
              {
                file,
                width: 1280,
                height: 800,
              }
            );
            const url = transformResponseToUrl(
              pasteImageBucketName,
              response.objectName
            );
            updateValue(placeholder, `![${filename}](${url})`);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            // Remove the placeholder if the upload fails.
            updateValue(placeholder, "");
          }
          // Only one image is uploaded.
          break;
        }
      }
    },
    [name, onChange, pasteImageBucketName, setFieldsValue, value]
  );

  return (
    <FormItemWrapper {...props}>
      <Input.TextArea
        ref={ref}
        style={inputBoxStyle}
        autoSize={autoSize}
        readOnly={readOnly}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onPaste={handlePaste}
      />
    </FormItemWrapper>
  );
}

function transformResponseToUrl(
  bucketName: string,
  objectName: string
): string {
  return `/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/${bucketName}/object/${objectName}`;
}
