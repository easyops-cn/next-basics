import React, { useState, useRef } from "react";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { Button, Input, Form } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  LinkOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import styles from "./DataView.module.css";
import { ContextConf } from "@next-core/brick-types";
import { BrickOptionItem } from "../interfaces";
import { cloneDeep, set } from "lodash";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { useBuilderNode } from "@next-core/editor-bricks-helper";

export interface DataViewProps {
  brickList?: BrickOptionItem[];
  onContextUpdate?: (context: ContextConf[]) => void;
}

export function DataView({
  brickList,
  onContextUpdate,
}: DataViewProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const context = rootNode?.context ?? [];
  const [settingItemForm] = Form.useForm();
  const [q, setQ] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [settingItem, setSettingItem] = useState<ContextConf>();
  const settingItemIndex = useRef<number | undefined>();
  const handleSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQ(event.target.value);
    },
    []
  );

  const setData = (context?: ContextConf, index?: number): void => {
    setSettingItem(context);
    setVisible(true);
    settingItemIndex.current = index;
  };

  const handleOk = () => {
    setVisible(false);
    settingItemForm.submit();
  };

  const handleContextItemUpdate = (contextItem: ContextConf) => {
    const contextToSubmit = set(
      cloneDeep(context),
      settingItemIndex.current ?? context.length,
      contextItem
    );
    onContextUpdate?.(contextToSubmit);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ToolboxPane title="Data">
      <div className={styles.searchWrapper}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search data..."
          value={q}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.wrapper}>
        <Button icon={<PlusOutlined />} size="small" onClick={() => setData()}>
          Add Data
        </Button>
        <div className={styles.varList}>
          {context?.length > 0 &&
            context.map((data, index) => (
              <div
                className={styles.varItem}
                onClick={() => setData(data, index)}
                key={data.name}
              >
                {data.resolve ? (
                  <LinkOutlined
                    style={{ color: "var(--theme-orange-color)" }}
                  />
                ) : (
                  <CodeOutlined style={{ color: "var(--theme-green-color)" }} />
                )}
                <span className={styles.varName}>{data.name}</span>
              </div>
            ))}
        </div>
      </div>
      <ContextItemFormModal
        data={settingItem}
        brickList={brickList}
        onContextItemUpdate={handleContextItemUpdate}
        settingItemForm={settingItemForm}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </ToolboxPane>
  );
}
