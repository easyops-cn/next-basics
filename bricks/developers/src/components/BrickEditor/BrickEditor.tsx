import React from "react";
import AceEditor, { IAceOptions } from "react-ace";
import { message } from "antd";
import { assign } from "lodash";
import { BrickConf } from "@next-core/brick-types";
import { Clipboard } from "@next-libs/clipboard";

import yaml from "js-yaml";
import "brace/mode/json";
import "brace/theme/github";
import "brace/mode/yaml";
import "brace/theme/monokai";

import cssStyle from "./style.module.css";

interface BrickEditorProps {
  defaultConf: BrickConf | BrickConf[];
  onConfChange: (conf: BrickConf | BrickConf[]) => void;
  aceSetOptions?: IAceOptions;
  mode: string;
}

export function BrickEditor({
  defaultConf,
  onConfChange,
  aceSetOptions,
  mode,
}: BrickEditorProps): React.ReactElement {
  const aceRef = React.useRef(null);
  const [valid, setValid] = React.useState(true);
  const changed = React.useRef(false);
  const [confString, setConfString] = React.useState("");
  const defaultAceSetOptions = {
    showLineNumbers: true,
    maxLines: Infinity,
    minLines: 5,
    tabSize: 2,
    printMargin: false,
    highlightActiveLine: false,
    highlightGutterLine: false,
  };

  const parse = (value: string, tryMode = mode): BrickConf => {
    let brickConf: BrickConf;
    if (value) {
      try {
        if (tryMode === "json") {
          brickConf = JSON.parse(value);
        } else {
          brickConf = yaml.safeLoad(value, {
            schema: yaml.JSON_SCHEMA,
            json: true,
          }) as BrickConf;
        }
        setValid(true);
      } catch (e) {
        setValid(false);
      }
    } else {
      setValid(true);
    }
    return brickConf;
  };

  const serialize = (brickConf: BrickConf): string => {
    let content = "";
    if (brickConf) {
      if (mode === "json") {
        content = JSON.stringify(brickConf, null, 2);
      } else {
        content = yaml.safeDump(brickConf, {
          schema: yaml.JSON_SCHEMA,
          skipInvalid: true,
          noRefs: true,
          noCompatMode: true,
        });
      }
    }
    return content;
  };

  const onButtonCopy = (text: string, success: boolean): void => {
    if (success) {
      message.success("复制成功");
    } else {
      message.error("复制失败");
    }
  };

  const setOptions = assign({}, defaultAceSetOptions, aceSetOptions);
  const handleStoryChange = (value: string): void => {
    changed.current = true;
    setConfString(value);

    parse(value);
  };

  const handleStoryBlur = (): void => {
    if (!changed.current) {
      return;
    }
    changed.current = false;
    const conf = parse(confString);
    if (conf) onConfChange(conf);
  };

  React.useEffect(() => {
    const content = serialize(defaultConf);
    setConfString(content);
  }, [mode]);

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
        value={confString}
        width="100%"
        editorProps={{ $blockScrolling: Infinity }}
        setOptions={setOptions}
        onChange={handleStoryChange}
        debounceChangePeriod={100}
        onBlur={handleStoryBlur}
      />
      <div className={cssStyle.copyIcon}>
        <Clipboard
          text={confString}
          onCopy={onButtonCopy}
          icon={{ theme: "outlined" }}
        />
      </div>
    </div>
  );
}
