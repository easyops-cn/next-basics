import React, { useState, useRef, useMemo } from "react";
import { Button, Form, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Trans, useTranslation } from "react-i18next";
import update from "immutability-helper";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { ContextConf } from "@next-core/brick-types";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import styles from "./DataView.module.css";
import { findIndex, uniqueId } from "lodash";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { searchList } from "./utils";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { ContextItem } from "./ContextItem";
import { useBuilderUIContext } from "../BuilderUIContext";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

const symbolId = Symbol("uid");

export interface DataViewProps {
  onContextUpdate?: (context: ContextConf[]) => void;
}

interface ContextConfWithSymbolId extends ContextConf {
  [symbolId]: string;
}

export function DataView({
  onContextUpdate,
}: DataViewProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { brickList } = useBuilderUIContext();
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

  const handleSearch = (value: string): void => {
    setQ(value);
  };

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

  const handleContextItemUpdate = (contextItem: ContextConfWithSymbolId) => {
    const targetIndex = settingUid.current
      ? findIndex(contextWithUniqueSymbolId, [symbolId, settingUid.current])
      : contextWithUniqueSymbolId.length;
    const newContext = update(contextWithUniqueSymbolId, {
      [targetIndex]: {
        $set: contextItem,
      },
    });
    onContextUpdate?.(newContext);
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

  const handleDropItem = (dragIndex: number, hoverIndex: number): void => {
    if (dragIndex === hoverIndex) {
      return;
    }
    const dragItem = contextWithUniqueSymbolId[dragIndex];
    const newContext = update(contextWithUniqueSymbolId, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem],
      ],
    });
    onContextUpdate?.(newContext);
  };

  return (
    <ToolboxPane
      title={t(K.DATA)}
      tooltips={
        <>
          <p>
            <Trans t={t} i18nKey={K.DATA_VIEW_TIPS_1} />
          </p>
          <p>
            <Trans t={t} i18nKey={K.DATA_VIEW_TIPS_2} />
          </p>
          <p>
            <Trans t={t} i18nKey={K.DATA_VIEW_TIPS_3} />
          </p>
        </>
      }
    >
      <SearchComponent placeholder={t(K.SEARCH_DATA)} onSearch={handleSearch} />
      <div className={styles.wrapper}>
        <Button
          icon={<PlusOutlined />}
          size="small"
          onClick={() => setData()}
          data-testid="add-data-btn"
        >
          {t(K.ADD_DATA)}
        </Button>
        <div className={styles.varList}>
          {filteredContextList?.length > 0 &&
            filteredContextList.map((data, index) => (
              <ContextItem
                data={data}
                handleItemClick={() => setData(data, data[symbolId])}
                handleItemDelete={(e) => handleContextItemDelete(e, data)}
                handleDropItem={handleDropItem}
                index={index}
                canDrag={!q}
                key={data[symbolId]}
              />
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
