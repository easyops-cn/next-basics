import React from "react";
import { useTranslation } from "react-i18next";
import { Radio } from "antd";
import { JsonStorage } from "@next-libs/storage";
import { BrickConf } from "@next-core/brick-types";
import { NS_DEVELOPERS, K } from "../i18n/constants";
import { BrickPreview } from "../components/BrickPreview/BrickPreview";
import { BrickEditor } from "../components/BrickEditor/BrickEditor";
import cssStyle from "./style.module.css";

const LOCAL_STORAGE_KEY_FOR_DEBUG_BRICK = "debug-brick";
const LOCAL_STORAGE_KEY_FOR_DEBUG_COLUMNS = "debug-columns";
const LOCAL_STORAGE_KEY_FOR_DEBUG_MODE = "debug-mode";
export function getRealConf(conf: BrickConf): BrickConf {
  const realConf: BrickConf = {};
  if ((conf as any)["$template"] !== undefined) {
    realConf.template = (conf as any)["$template"];
    realConf.params = (conf as any)["$params"];
    return realConf;
  }
  return conf;
}

export function BrickDebug(): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const jsonLocalStorage = new JsonStorage(localStorage, "developers-");
  const defaultConf: BrickConf = jsonLocalStorage.getItem(
    LOCAL_STORAGE_KEY_FOR_DEBUG_BRICK
  ) || {
    brick: "presentational-bricks.brick-tag",
    properties: {
      componentType: "CheckableTag",
      tagList: ["develop", "test"],
      configProps: {
        color: "#108ee9",
      },
      default: "develop",
    },
  };

  const [conf, setConf] = React.useState(defaultConf);

  const [columns, setColumns] = React.useState(
    jsonLocalStorage.getItem(LOCAL_STORAGE_KEY_FOR_DEBUG_COLUMNS) || 2
  );
  const [mode, setMode] = React.useState(
    jsonLocalStorage.getItem(LOCAL_STORAGE_KEY_FOR_DEBUG_MODE) ?? "json"
  );
  if (!conf) {
    return null;
  }

  const handleConfChange = (conf: BrickConf): void => {
    setConf(conf);
    jsonLocalStorage.setItem(
      LOCAL_STORAGE_KEY_FOR_DEBUG_BRICK,
      getRealConf(conf)
    );
  };
  const handleChangeColumns = (event: any): void => {
    const columns = event.target.value;
    setColumns(columns);
    jsonLocalStorage.setItem(LOCAL_STORAGE_KEY_FOR_DEBUG_COLUMNS, columns);
  };
  const handleChangeMode = (event: any): void => {
    const mode = event.target.value;
    setMode(mode);
    jsonLocalStorage.setItem(LOCAL_STORAGE_KEY_FOR_DEBUG_MODE, mode);
  };
  return (
    <>
      <p>
        {t(K.DEBUG_INTRODUCTION)}:
        <Radio.Group
          style={{ float: "right", marginLeft: "10px" }}
          defaultValue={mode}
          buttonStyle="solid"
          onChange={handleChangeMode}
        >
          <Radio.Button value="json">JSON</Radio.Button>
          <Radio.Button value="yaml">YAML</Radio.Button>
        </Radio.Group>
        <Radio.Group
          style={{ float: "right" }}
          defaultValue={columns}
          buttonStyle="solid"
          onChange={handleChangeColumns}
        >
          <Radio.Button value={2}>{t(K.DEBUG_COLUMNS_TWO)}</Radio.Button>
          <Radio.Button value={1}>{t(K.DEBUG_COLUMNS_ONE)}</Radio.Button>
        </Radio.Group>
      </p>
      <div
        className={cssStyle.debugContainer}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        <BrickEditor
          defaultConf={conf}
          mode={mode}
          onConfChange={handleConfChange}
          aceSetOptions={{
            minLines: 10,
            highlightActiveLine: true,
          }}
        />
        <BrickPreview conf={conf} />
      </div>
    </>
  );
}
