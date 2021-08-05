import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Transfer } from "antd";
import { TransferItem, TransferLocale } from "antd/lib/transfer";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import cssStyle from "./style.module.css";

interface GeneralTransferProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  onChange: (targetKeys: string[]) => void;
  onSelectedChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  maxSelected?: number;

  locale?: Partial<TransferLocale>;
  listStyle?: React.CSSProperties;
  titles?: string[];
  operations?: string[];
  selectedKeys?: string[];
  disabled?: boolean;
  showSearch?: boolean;
  showSelectAll?: boolean;
}

export function GeneralTransfer(
  props: GeneralTransferProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  const onChange = (
    targetKeys: string[],
    direction: string,
    moveKeys: string[]
  ): void => {
    if (!props.maxSelected || targetKeys.length <= props.maxSelected) {
      props.onChange(targetKeys);
    } else {
      Modal.warning({
        title: "提示",
        content: `所选数量超过最大限制（${props.maxSelected}），请重新选择`,
        okText: "知道了",
      });
    }
  };

  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ): void => {
    props.onSelectedChange?.(sourceSelectedKeys, targetSelectedKeys);
  };

  const filterOption = (inputValue: string, item: TransferItem): boolean => {
    const q = inputValue.trim().toLowerCase();
    return item.title.toLowerCase().includes(q);
  };

  const footer = (): React.ReactNode => {
    return (
      <div className={cssStyle.footer}>最多选择 {props.maxSelected} 个</div>
    );
  };

  return (
    <div className={cssStyle.container}>
      <Transfer
        lazy={false}
        dataSource={props.dataSource}
        render={(item) => item.title}
        targetKeys={props.targetKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        locale={props.locale}
        listStyle={props.listStyle}
        titles={props.titles}
        operations={props.operations}
        selectedKeys={props.selectedKeys}
        disabled={props.disabled}
        filterOption={filterOption}
        showSearch={props.showSearch}
        showSelectAll={props.showSelectAll}
        footer={props.maxSelected && footer}
      />
    </div>
  );
}
