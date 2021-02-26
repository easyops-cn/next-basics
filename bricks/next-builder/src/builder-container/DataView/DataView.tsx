import React, { useState, useRef, useMemo } from "react";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { Button, Input, Form, Modal } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  LinkOutlined,
  CodeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styles from "./DataView.module.css";
import { ContextConf } from "@next-core/brick-types";
import { BrickOptionItem } from "../interfaces";
import { cloneDeep, findIndex, set, uniqueId } from "lodash";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { searchList } from "./utils";

const symbolId = Symbol("uid");

export interface DataViewProps {
  brickList?: BrickOptionItem[];
  onContextUpdate?: (context: ContextConf[]) => void;
}

interface ContextConfWithSymbolId extends ContextConf {
  [symbolId]: string;
}

export function DataView({
  brickList,
  onContextUpdate,
}: DataViewProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const contextWithUniqueSymbolId: ContextConfWithSymbolId[] = useMemo(() => {
    const originContext = ((rootNode?.context as ContextConf[]) ?? []).map(
      (v) => ({
        ...v,
        [symbolId]: uniqueId(),
      })
    );
    return originContext;
  }, [rootNode?.context]);

  const [settingItemForm] = Form.useForm();
  const [q, setQ] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [settingItem, setSettingItem] = useState<ContextConf>();
  const settingUid = useRef<string | undefined>();

  const handleSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQ(event.target.value);
    },
    []
  );

  const filteredContextList: ContextConfWithSymbolId[] = useMemo(
    () => searchList(contextWithUniqueSymbolId, q, "name"),
    [contextWithUniqueSymbolId, q]
  );

  const setData = (contextValue?: ContextConf, uid?: string): void => {
    setSettingItem(contextValue);
    setVisible(true);
    settingUid.current = uid;
  };

  const handleOk = () => {
    setVisible(false);
    settingItemForm.submit();
  };

  const handleContextItemUpdate = (contextItem: ContextConf) => {
    const contextToSubmit = set(
      cloneDeep(contextWithUniqueSymbolId),
      settingUid.current
        ? findIndex(contextWithUniqueSymbolId, [symbolId, settingUid.current])
        : contextWithUniqueSymbolId.length,
      contextItem
    );
    onContextUpdate?.(contextToSubmit);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleContextItemDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    dataItem: ContextConfWithSymbolId
  ): void => {
    e.stopPropagation();
    // istanbul ignore next
    Modal.confirm({
      title: "Delete Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure delete data{" "}
          <strong className={styles.dangerText}>{dataItem.name}</strong>?
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const contextToSubmit = contextWithUniqueSymbolId.filter(
          (v) => v[symbolId] !== dataItem[symbolId]
        );
        onContextUpdate?.(contextToSubmit);
      },
    });
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
        <Button
          icon={<PlusOutlined />}
          size="small"
          onClick={() => setData()}
          data-testid="add-data-btn"
        >
          Add Data
        </Button>
        <div className={styles.varList}>
          {filteredContextList?.length > 0 &&
            filteredContextList.map((data) => (
              <div
                className={styles.varItem}
                onClick={() => setData(data, data[symbolId])}
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
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  className={styles.deleteIcon}
                  onClick={(e) => handleContextItemDelete(e, data)}
                />
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
