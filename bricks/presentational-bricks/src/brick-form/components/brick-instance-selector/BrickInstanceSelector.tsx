import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "antd";

import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { BrickTable, CustomColumn } from "../../../brick-table/BrickTable";

export interface BrickInstanceSelectProps {
  optionList: Record<string, any>[];
  instanceList: {
    query?: Record<string, any>;
    columns: CustomColumn[];
  };
  onChange: (value: any) => void;
  dispatchCustomEvent: (query: any) => void;
}

export function InstanceSelector(
  props: BrickInstanceSelectProps
): React.ReactElement {
  const [selected, setSelected] = useState([...(props.optionList || [])]);

  const readyToAcceptPropsOptionList = useRef(false);
  const onAddClick = () => {
    readyToAcceptPropsOptionList.current = true;
    props.dispatchCustomEvent({
      aq: [
        { instanceId: { $nin: selected.map(i => i.instanceId) } },
        props.instanceList.query
      ]
    });
  };

  const changeAndNotify = (records: Record<string, any>[]) => {
    const value = [...records];
    setSelected(value);
    props.onChange(records.map(record => record.instanceId));
  };

  const onDelete = (index: number) => {
    readyToAcceptPropsOptionList.current = false;
    const value = selected.filter((item, i) => i !== index);
    changeAndNotify(value);
  };

  useEffect(() => {
    if (!readyToAcceptPropsOptionList.current) return;
    readyToAcceptPropsOptionList.current = false;
    changeAndNotify([...selected, ...props.optionList]);
  }, [props.optionList]);

  return (
    <div>
      <Button onClick={onAddClick} style={{ marginBottom: 10 }}>
        添加
      </Button>

      <BrickTable
        dataSource={selected}
        columns={props.instanceList.columns}
        deleteEnabled={true}
        onDelete={onDelete}
        onChange={null}
        configProps={{
          locale: { emptyText: "请添加服务节点" },
          pagination: false
        }}
        showCard={false}
      />
    </div>
  );
}

export const BrickInstanceSelector = WrapperFormItem(InstanceSelector);
