import React, { useEffect, useMemo } from "react";
import AceEditor, { IAceEditorProps } from "react-ace";
import { message } from "antd";
import { Clipboard } from "@next-libs/clipboard";
import { debounce } from "lodash";

import "brace/theme/github";
import "brace/mode/yaml";
import "brace/theme/monokai";

import cssStyle from "./style.module.css";

interface V3BrickEditorProps {
  value?: string;
  mode?: string;
  onDebouncedChange?: (value: string, mode: string) => void;
}

export function V3BrickEditor(props: V3BrickEditorProps): React.ReactElement {
  const { mode, onDebouncedChange } = props;
  const aceRef = React.useRef(null);
  const [valid, setValid] = React.useState(true);
  const [value, setValue] = React.useState(props.value ?? "");

  const debouncedChange = useMemo(() => {
    if (onDebouncedChange) return debounce(onDebouncedChange, 200);
  }, [onDebouncedChange]);

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  const onButtonCopy = (text: string, success: boolean): void => {
    if (success) {
      message.success("复制成功");
    } else {
      message.error("复制失败");
    }
  };

  const handleChange = (value: string): void => {
    setValue(value);
    debouncedChange?.(value, mode);
  };

  const onValidate: IAceEditorProps["onValidate"] = (annotations) => {
    const hasError = annotations.some((v) => v.type === "error") || !value;
    setValid(!hasError);
  };

  return (
    <div
      className={cssStyle.editorCard}
      style={{ boxShadow: valid ? "none" : "red 0px 0px 3px 1px" }}
    >
      <AceEditor
        ref={aceRef}
        theme="monokai"
        mode={mode}
        showGutter={true}
        value={value}
        width="100%"
        height="100%"
        editorProps={{ $blockScrolling: Infinity }}
        setOptions={{
          showLineNumbers: true,
          maxLines: Infinity,
          minLines: 5,
          tabSize: 2,
          printMargin: false,
          highlightActiveLine: false,
          highlightGutterLine: false,
        }}
        onChange={handleChange}
        onValidate={onValidate}
      />
      <div className={cssStyle.copyIcon}>
        <Clipboard
          text={value}
          onCopy={onButtonCopy}
          icon={{ theme: "outlined" }}
        />
      </div>
    </div>
  );
}
