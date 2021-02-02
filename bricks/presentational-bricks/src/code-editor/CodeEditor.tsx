import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "./brace/mode";
import "./brace/theme";
import style from "./index.module.css";
import classNames from "classnames";
import { find } from "lodash";

interface CodeEditorProps {
  theme: string;
  mode: string;
  setOptions?: Record<string, any>;
  editorProps?: Record<string, any>;
  editorStyle?: Record<string, any>;
  dataSource: any;
  configProps?: any;
  handleChange?: (value: any) => void;
  handleErrorChange?: (value: boolean) => void;
  handleBlur?: (value: any) => void;
  handleValidate?: (value: any) => void;
  required: boolean;
}

export function CodeEditor({
  theme,
  mode,
  setOptions,
  editorProps,
  dataSource,
  configProps,
  handleChange,
  handleBlur,
  handleErrorChange,
  required,
  editorStyle
}: CodeEditorProps): React.ReactElement {
  const [value, setValue] = useState(dataSource || "");
  const [hasError, setHasError] = useState(false);

  const handleOnChange = (newValue: string): void => {
    setValue(newValue);
  };

  useEffect(() => {
    handleChange(value);
  }, [value]);

  useEffect(() => {
    handleOnChange(dataSource || "");
  }, [dataSource]);

  const handleOnBlur = (): void => {
    handleBlur(value);
  };

  const onValidate = err => {
    let requiredError = false;
    if (required) {
      requiredError = !value;
    }
    setHasError(!!find(err, ["type", "error"]) || requiredError);
  };

  useEffect(() => {
    handleErrorChange(hasError);
  }, [hasError]);

  return (
    <AceEditor
      name="commands-editor"
      style={editorStyle}
      theme={theme}
      mode={mode}
      value={value}
      setOptions={setOptions}
      {...configProps}
      onChange={handleOnChange}
      onValidate={onValidate}
      onBlur={handleOnBlur}
      // Tips: Automatically scrolling cursor into view after selection change this will be disabled in the next version set editor.$blockScrolling = Infinity to disable this message
      editorProps={{ ...editorProps, $blockScrolling: Infinity }}
      className={classNames(style.aceContainer, {
        [style.hasError]: hasError
      })}
    />
  );
}
