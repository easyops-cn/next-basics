import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import type { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import type { TransferItem, TransferProps } from "antd/es/transfer";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import { Transfer, Table, Modal, TableColumnType } from "antd";
import difference from "lodash/difference";
import styles from "./index.module.css";
import { cloneDeep, isNumber, get } from "lodash";

interface TableTransferProps {
  dataSource: any[];
  columns: ColumnsType<Record<string, any>>;
  targetKeys?: string[];
  change?: (keys: string[]) => void;
  sortChange?: (keys: string[]) => void;
  dragSortable?: boolean;
  sortTitle?: string;
  disabled?: boolean;
  selectedKeys?: string[];
  maxSelected?: number;
  listStyle?: React.CSSProperties;
  titles?: string[];
}
export function arrayMoveImmutable(array, fromIndex, toIndex) {
  const newArray = [...array];
  const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex;
    const [item] = newArray.splice(fromIndex, 1);
    newArray.splice(endIndex, 0, item);
  }
  return newArray;
}
export function filterDisabledDataSource(
  dataSource: any[] = [],
  targetKeys: string[] = [],
  maxSelected?: number
) {
  const result = cloneDeep(dataSource);
  if (isNumber(maxSelected) && targetKeys.length >= maxSelected) {
    result.forEach((item) => {
      if (!item.disabled && !targetKeys.includes(item.key)) {
        item.disabled = true;
      }
    });
  } else {
    result.forEach((item) => {
      if (item.disabled) {
        delete item.disabled;
      }
    });
  }
  return result;
}
export function filterOptions(
  value: string,
  item: Record<string, any>,
  columns: ColumnsType
) {
  const fields = columns.map((col) => get(col, "dataIndex"));
  return fields.some((field) =>
    get(item, field).toLowerCase().includes(value.toLowerCase())
  );
}
export function TableTransfer(props: TableTransferProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);
  const {
    dataSource: originDataSource,
    columns: originColumns,
    targetKeys: originTargetKeys,
    change,
    sortChange,
    dragSortable,
    sortTitle = t(K.SORT),
    disabled,
    selectedKeys,
    maxSelected,
    listStyle,
    titles,
  } = props;
  // let modifiedDataSource;
  const [dataSource, setDataSource] = useState([]);
  const [rightColumns, setRightColumns] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  useEffect(() => {
    const modifiedDataSource = filterDisabledDataSource(
      originDataSource,
      originTargetKeys,
      maxSelected
    );
    setDataSource(modifiedDataSource);
    setTargetKeys(originTargetKeys);
    if (dragSortable) {
      const DragHandle = SortableHandle(() => (
        <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
      ));
      setRightColumns([
        ...originColumns,
        { title: sortTitle, dataIndex: "sort", render: () => <DragHandle /> },
      ]);
    }
  }, [originDataSource, originTargetKeys, originColumns]);
  const onChange = (nextTargetKeys: string[], direction: "left" | "right") => {
    if (
      direction === "left" ||
      !props.maxSelected ||
      nextTargetKeys.length <= props.maxSelected
    ) {
      setTargetKeys(nextTargetKeys);
      change(nextTargetKeys);
      const modifiedDataSource = filterDisabledDataSource(
        dataSource,
        nextTargetKeys,
        maxSelected
      );
      setDataSource(modifiedDataSource);
    } else {
      Modal.warning({
        title: "提示",
        content: `所选数量超过最大限制（${props.maxSelected}），请重新选择`,
        okText: "知道了",
      });
    }
  };

  return (
    <Transfer
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      dataSource={dataSource}
      onChange={onChange}
      showSelectAll={false}
      listStyle={listStyle}
      showSearch
      filterOption={(inputValue: string, item: Record<string, any>) => {
        return filterOptions(inputValue, item, originColumns);
      }}
      disabled={disabled}
      titles={titles}
    >
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? originColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: (item) => ({
            disabled: listDisabled || item.disabled,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys as string[], selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key as string, selected);
            if (isNumber(maxSelected)) {
              const modifiedDataSource = filterDisabledDataSource(
                dataSource,
                selected &&
                  targetKeys.length + listSelectedKeys.length + 1 >= maxSelected
                  ? [...targetKeys, ...listSelectedKeys, key]
                  : [],
                maxSelected
              );
              setDataSource(modifiedDataSource);
            }
          },
          selectedRowKeys: listSelectedKeys,
          hideSelectAll:
            direction === "left" &&
            isNumber(maxSelected) &&
            maxSelected < dataSource.length,
        };
        const SortableItem = SortableElement(
          (props: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr {...props} />
          )
        );
        const SortableBody = SortableContainer(
          (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <tbody {...props} />
          )
        );
        const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
          if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable(
              filteredItems.slice(),
              oldIndex,
              newIndex
            ).filter((el) => !!el);
            if (direction === "right") {
              setTargetKeys(newData.map((item) => item.key));
            }
            sortChange(newData.map((item: Record<string, any>) => item.key));
          }
        };
        const DraggableContainer = (props: SortableContainerProps) => (
          <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass={styles["row-dragging"]}
            onSortEnd={(direction) => onSortEnd(direction)}
            {...props}
          />
        );
        const DraggableBodyRow = ({ className, style, ...restProps }) => {
          // function findIndex base on Table rowKey props and should always be a right array index;
          const index = filteredItems.findIndex(
            (x) => x.key === restProps["data-row-key"]
          );
          return <SortableItem index={index} {...restProps} />;
        };
        return (
          <Table
            rowSelection={rowSelection}
            dataSource={filteredItems}
            columns={columns}
            size="small"
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(
                  key as string,
                  !listSelectedKeys.includes(key as string)
                );
              },
            })}
            components={
              dragSortable
                ? {
                    body: {
                      wrapper: DraggableContainer,
                      row: DraggableBodyRow,
                    },
                  }
                : null
            }
          />
        );
      }}
    </Transfer>
  );
}
