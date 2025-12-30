// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo } from "react";
import Icon from "@ant-design/icons";
import { Table, Card, ConfigProvider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableProps } from "antd/lib/table";
import { ExpandableConfig } from "antd/lib/table/interface";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { getCellStyle } from "./brickTableHelper";
import { pickBy, isNil, toPath, isEqual, isEmpty } from "lodash";
import classNames from "classnames";
import styles from "./BrickTable.module.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CustomColumn, CustomColumnComponent } from "./index";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import { EasyopsEmpty } from "@next-core/brick-kit";

const type = "DraggableBodyRow";

const downMenuIcon: MenuIcon = {
  lib: "antd",
  icon: "down",
  theme: "outlined",
};

const rightMenuIcon: MenuIcon = {
  lib: "antd",
  icon: "right",
  theme: "outlined",
};
export interface TableDragInfo {
  order: "asc" | "desc";
  dragData: Record<string, any>;
  anchorData: Record<string, any>;
}
export interface BrickTableProps<RecordType = Record<string, unknown>>
  extends Pick<
    TableProps<RecordType>,
    | "dataSource"
    | "expandRowByClick"
    | "defaultExpandAllRows"
    | "onExpand"
    | "onExpandedRowsChange"
    | "expandedRowKeys"
    | "scroll"
    | "showHeader"
  > {
  columns: CustomColumn[];
  configProps?: TableProps<RecordType>;
  error?: any;
  deleteEnabled?: boolean;
  onDelete?: (index: number) => void;
  onChange: any;
  onSelectChange?: (selected: string[]) => void;
  showCard?: boolean;
  // 展开行相关属性
  expandedRowBrick?: {
    useBrick?: UseBrickConf;
  };
  emptyUseBrick?: {
    useBrick?: UseBrickConf;
  };
  expandIcon?: {
    collapsedIcon: MenuIcon;
    expandedIcon: MenuIcon;
  };
  expandIconAsCell?: boolean;
  expandIconColumnIndex?: number;
  rowKey?: string;
  childrenColumnName?: string;
  tableDraggable?: boolean;
  onDrag?: (data: Record<string, any>[], info: TableDragInfo) => void;
  zebraPattern?: boolean;
  optimizedColumns?: Array<string | number>;
  ellipsisInfo?: boolean;
  thTransparent?: boolean;
  acceptType?: string;
  xSmallSizeTable?: boolean;
  showHeaderExpandAll?: boolean;
  expandable?: ExpandableConfig<RecordType> | false;
  columnKeyBrickMap?: Record<string, { useBrick: UseBrickConf }>;
}

const DraggableBodyRow = ({
  index,
  moveRow,
  acceptType,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: acceptType || type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index
            ? `${styles.dropOverDownward}`
            : `${styles.dropOverUpward}`,
      };
    },
    drop: (item: any) => {
      /* istanbul ignore next */
      moveRow(item.index, index, item.rowKey);
    },
  });
  const [, drag] = useDrag({
    item: {
      type: acceptType || type,
      index,
      rowKey: restProps["data-row-key"],
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={classNames(className, styles.draggableRow, {
        [dropClassName]: isOver,
      })}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

const getCustomHeader = (
  useBrick: UseBrickConf,
  data?: { title: unknown }
): (() => React.ReactElement) => {
  return function CustomHeader() {
    return <BrickAsComponent useBrick={useBrick} data={data} />;
  };
};

type ItemBrickDataMap = Map<unknown, BrickData>;
type BrickData = {
  cellData: unknown;
  rowData: Record<string, unknown>;
  columnIndex: number;
};

const getCustomComp = (
  useBrick: UseBrickConf,
  component?: CustomColumnComponent,
  itemBrickDataMap?: ItemBrickDataMap
) => {
  return function CustomComp(
    value: any,
    item: Record<string, any>,
    index: number
  ) {
    if (useBrick) {
      let brickData: BrickData = itemBrickDataMap.get(item);

      if (!brickData) {
        brickData = {
          cellData: value,
          rowData: item,
          columnIndex: index,
        };
        itemBrickDataMap.set(item, brickData);
      }

      return <BrickAsComponent useBrick={useBrick} data={brickData} />;
    }

    if (component.fields) {
      // eslint-disable-next-line no-console
      console.warn(
        "`<presentational-bricks.brick-table>.columns[].component` is deprecated, use `useBrick` instead."
      );
      const props: Record<string, any> = Object.assign(
        {},
        component.properties
      );
      const {
        value: valueKey,
        item: itemKey,
        index: indexKey,
      } = component.fields;
      if (valueKey) {
        props[valueKey] = value;
      }

      if (itemKey) {
        props[itemKey] = item;
      }

      if (indexKey) {
        props[indexKey] = index;
      }

      return (
        <BrickAsComponent
          key={value}
          useBrick={{
            ...component,
            properties: props,
          }}
        />
      );
    }
  };
};

export function BrickTable(props: BrickTableProps): React.ReactElement {
  if (props.error) {
    throw props.error;
  }

  const {
    configProps,
    columns,
    rowKey = "key",
    expandIconAsCell,
    expandIconColumnIndex,
    childrenColumnName,
    deleteEnabled,
    scroll,
    optimizedColumns,
    onDelete, // 用于 brick form 中，will be deprecated
    ellipsisInfo,
    showHeader,
    expandable: _expandable,
    columnKeyBrickMap,
  } = props;

  const initData = useMemo(() => {
    return props.dataSource?.map((item, index) =>
      isNil(item[rowKey]) ? { ...item, [rowKey]: index } : item
    );
  }, [props.dataSource, rowKey]);

  const [data, setData] = useState(initData);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const rowKeyExpandIconMapRef = useRef<Map<unknown, React.ReactNode>>(
    new Map()
  );
  const columnTitleBrickDataMapRef = useRef<
    Map<CustomColumn, { title: unknown }>
  >(new Map());
  const useBrickItemBrickDataMapRef = useRef<
    Map<UseBrickConf, ItemBrickDataMap>
  >(new Map());
  const itemExpandedRowBrickDataMapRef = useRef<Map<unknown, unknown>>(
    new Map()
  );

  const treeToFlat = (list: any) => {
    const childrenName = props.childrenColumnName || "children";
    return list.reduce((ls: any, item: any) => {
      const { children, ...res } = { ...item, children: item[childrenName] };
      if (children && children.length) {
        return ls.concat(
          { ...res, isParentOfTree: true },
          treeToFlat(children)
        );
      } else {
        return ls.concat(res);
      }
    }, []);
  };

  useEffect(() => {
    if (props.expandedRowKeys) {
      setExpandedRowKeys(props.expandedRowKeys);
    } else if (props.defaultExpandAllRows) {
      setExpandedRowKeys(
        treeToFlat(props.dataSource || [])
          .filter((i) => i.isParentOfTree)
          .map((i) => i[props.rowKey])
      );
    }
  }, [
    props.expandedRowKeys,
    props.dataSource,
    props.defaultExpandAllRows,
    props.rowKey,
  ]);

  useEffect(() => {
    itemExpandedRowBrickDataMapRef.current.clear();
    setData(initData);
  }, [initData]);

  const expandIconColumnIndexOffset = configProps?.rowSelection ? -1 : 0;
  const customColumns = useMemo(() => {
    if (columns) {
      columnTitleBrickDataMapRef.current.clear();
      useBrickItemBrickDataMapRef.current.clear();
      const customColumns = columns.map((column, index) => {
        const {
          component,
          valueSuffix,
          cellStatus,
          cellStyle = {},
          titleUseBrick,
          headerBrick,
          colSpanKey,
          rowSpanKey,
          filterDropdownBrick,
          customFilterIcon,
          ...columnConf
        } = column;
        const useBrick =
          column.useBrick ||
          columnKeyBrickMap?.[column.key || (column.dataIndex as string)]
            ?.useBrick;

        if (headerBrick?.useBrick || titleUseBrick) {
          if (titleUseBrick) {
            // eslint-disable-next-line no-console
            console.warn(
              "`titleUseBrick` of `<presentational-bricks.brick-table>` is deprecated, use `headerBrick` instead."
            );
          }

          const useBrick = headerBrick?.useBrick || titleUseBrick;
          let data = columnTitleBrickDataMapRef.current.get(column);

          if (!data) {
            data = {
              title: columnConf.title,
            };
            columnTitleBrickDataMapRef.current.set(column, data);
          }

          columnConf.title = getCustomHeader(useBrick, data);
        }
        if (index === 0 && !!props.showHeaderExpandAll) {
          let iconNode: React.ReactNode = <></>;
          let icon = props.expandIcon?.collapsedIcon || downMenuIcon;
          const allKeys = treeToFlat(props.dataSource || [])
            .filter((i) => i.isParentOfTree)
            .map((i) => i[props.rowKey]);
          if (!allKeys?.every((i) => expandedRowKeys?.includes(i))) {
            icon = props.expandIcon?.expandedIcon || rightMenuIcon;
          }
          iconNode = (
            <span
              className={styles.expandIconSpan}
              data-testid="expand-all-icon"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setExpandedRowKeys(isEmpty(expandedRowKeys) ? allKeys : []);
              }}
            >
              <GeneralIcon icon={icon} />
            </span>
          );
          columnConf.title = (
            <>
              {iconNode}
              {columnConf.title}
            </>
          );
        }

        if (filterDropdownBrick?.useBrick) {
          columnConf.filterDropdown = (
            <BrickAsComponent
              useBrick={filterDropdownBrick.useBrick}
            ></BrickAsComponent>
          );
        }
        columnConf.filterIcon = (
          <GeneralIcon
            icon={
              customFilterIcon || {
                lib: "easyops",
                icon: "condition-config-fill",
                category: "default",
              }
            }
          />
        );

        if (useBrick || component) {
          let itemBrickDataMap: ItemBrickDataMap;

          if (useBrick) {
            itemBrickDataMap =
              useBrickItemBrickDataMapRef.current.get(useBrick);

            if (!itemBrickDataMap) {
              itemBrickDataMap = new Map();
              useBrickItemBrickDataMapRef.current.set(
                useBrick,
                itemBrickDataMap
              );
            }
          }

          columnConf.render = getCustomComp(
            useBrick,
            component,
            itemBrickDataMap
          );
          if (optimizedColumns?.includes(column.dataIndex)) {
            // [only update when record changed](https://ant.design/components/table-cn/#%E4%B8%BA%E4%BB%80%E4%B9%88-%E6%9B%B4%E6%96%B0-state-%E4%BC%9A%E5%AF%BC%E8%87%B4%E5%85%A8%E8%A1%A8%E6%B8%B2%E6%9F%93%EF%BC%9F)
            columnConf.shouldCellUpdate = (record, prevRecord) => {
              return !isEqual(record, prevRecord);
            };
          }
        } else if (valueSuffix) {
          columnConf.render = (value) => value + valueSuffix;
        }
        if (
          !expandIconAsCell &&
          index === expandIconColumnIndex + expandIconColumnIndexOffset
        ) {
          const innerRender = columnConf.render;
          columnConf.render = function ExpandIcon(value, record, index) {
            return (
              <>
                {!record[childrenColumnName] &&
                  rowKeyExpandIconMapRef.current.get(
                    rowKey ? record[rowKey] : record
                  )}
                {innerRender ? innerRender(value, record, index) : value}
              </>
            );
          };
        }
        if (cellStatus || colSpanKey || rowSpanKey || cellStyle) {
          const innerRender = columnConf.render;
          columnConf.render = (value, item, index) => {
            return {
              children: innerRender ? innerRender(value, item, index) : value,
              props: {
                colSpan: item[colSpanKey],
                rowSpan: item[rowSpanKey],
                style: {
                  ...(cellStatus ? getCellStyle(cellStatus, item, value) : {}),
                  ...cellStyle,
                },
              },
            };
          };
        }

        if (typeof columnConf.dataIndex === "string") {
          columnConf.dataIndex = toPath(columnConf.dataIndex);
        }
        if (columnConf.verticalAlign === "top") {
          columnConf.className
            ? (columnConf.className += " alignTop")
            : (columnConf.className = "alignTop");
        }
        if (columnConf.verticalAlign === "bottom") {
          columnConf.className
            ? (columnConf.className += " alignBottom")
            : (columnConf.className = "alignBottom");
        }
        if (ellipsisInfo) {
          columnConf.className = styles.ellipsisInfoCell;
        }
        return columnConf;
      });

      if (deleteEnabled) {
        const render = (value: any, item: any, index: number) => {
          return (
            <Icon
              onClick={() => onDelete?.(index)}
              component={() => <FontAwesomeIcon icon="trash-alt" />}
              style={{ color: "#167be0" }}
            />
          );
        };

        customColumns.push({
          title: "操作",
          render,
        });
      }

      return customColumns;
    }
  }, [
    columns,
    childrenColumnName,
    expandIconAsCell,
    expandIconColumnIndex,
    expandIconColumnIndexOffset,
    rowKey,
    deleteEnabled,
    onDelete,
    ellipsisInfo,
    expandedRowKeys,
  ]);

  const expandedRowRender = (record: Record<string, any>, index: number) => {
    let data = itemExpandedRowBrickDataMapRef.current.get(record);

    if (!data) {
      data = {
        rowData: record,
        rowIndex: index,
      };
      itemExpandedRowBrickDataMapRef.current.set(record, data);
    }

    return (
      <BrickAsComponent
        useBrick={props.expandedRowBrick.useBrick}
        data={data}
      />
    );
  };

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  /* istanbul ignore next */
  const getNewDateAfterMoving = ({
    oldData,
    dragIndex,
    hoverIndex,
    dragRowKey,
    rowKeyField,
    childrenColumnName,
  }: {
    oldData: Record<string, any>[];
    dragIndex: number;
    hoverIndex: number;
    dragRowKey: string;
    rowKeyField: string;
    childrenColumnName: string;
  }): Record<string, any>[] => {
    const recursion = (list: Record<string, any>[]): Record<string, any>[] => {
      return list.map((item) =>
        update(item, {
          [childrenColumnName]: {
            $apply: (subItems: Record<string, any>[]) => {
              if (!subItems?.length) return subItems;
              const dragRow = subItems.find(
                (x: Record<string, any>) => x[rowKeyField] === dragRowKey
              );
              return dragRow
                ? update(subItems, {
                    $splice: [
                      [dragIndex, 1],
                      [hoverIndex, 0, dragRow],
                    ],
                  })
                : recursion(subItems);
            },
          },
        })
      );
    };

    return oldData?.find((item) => item[rowKeyField] === dragRowKey)
      ? update(oldData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, oldData[dragIndex]],
          ],
        })
      : recursion(oldData);
  };
  const moveRow = (
    dragIndex: number,
    hoverIndex: number,
    dragRowKey: string
  ) => {
    const order = dragIndex > hoverIndex ? "asc" : "desc";
    /* istanbul ignore next */
    const newData = getNewDateAfterMoving({
      oldData: data,
      dragIndex,
      hoverIndex,
      dragRowKey,
      rowKeyField: rowKey,
      childrenColumnName,
    });
    setData(newData);
    props.onDrag &&
      props.onDrag(newData, {
        order,
        dragData: data.find((d, index) => index === dragIndex),
        anchorData: data.find((d, index) => index === hoverIndex),
      });
  };

  const onExpand = (expanded: boolean, record: Record<string, any>) => {
    setExpandedRowKeys(
      expanded
        ? expandedRowKeys.concat(record[props.rowKey])
        : expandedRowKeys.filter((i) => i !== record[props.rowKey])
    );
    props.onExpand && props.onExpand(expanded, record);
  };

  const onExpandedRowsChange = (expandedRows: readonly React.Key[]) => {
    props.onExpandedRowsChange && props.onExpandedRowsChange(expandedRows);
  };

  const getCustomExpandIcon = (iconProps: any) => {
    const { record, expandable, expanded, onExpand } = iconProps;
    let icon = props.expandIcon?.collapsedIcon || downMenuIcon;
    let iconNode: React.ReactNode;
    if (expandable) {
      if (!expanded) {
        icon = props.expandIcon?.expandedIcon || rightMenuIcon;
      }
      iconNode = (
        <span
          className={styles.expandIconSpan}
          data-testid="expand-icon"
          onClick={(e) => {
            onExpand(record, e);
          }}
        >
          <GeneralIcon icon={icon} />
        </span>
      );
    } else {
      iconNode = (
        <span className={styles.expandIconSpan} data-testid="expand-icon">
          <span style={{ visibility: "hidden" }}>
            <GeneralIcon icon={icon} />
          </span>
        </span>
      );
    }

    if (iconNode) {
      if (!expandIconAsCell) {
        rowKeyExpandIconMapRef.current.set(
          rowKey ? record[rowKey] : record,
          iconNode
        );
      }
      return iconNode;
    } else {
      return <></>;
    }
  };

  const pickExpandProps = useMemo(
    () =>
      pickBy(
        {
          expandIconColumnIndex,
          expandIconAsCell,
          expandRowByClick: props.expandRowByClick,
          expandedRowKeys: expandedRowKeys,
          defaultExpandAllRows: props.defaultExpandAllRows,
        },
        (item) => !isNil(item)
      ),
    [expandedRowKeys]
  );
  const expandable =
    _expandable !== false
      ? {
          ..._expandable,
          ...(props.expandedRowBrick
            ? {
                expandedRowRender,
              }
            : {}),
          ...pickExpandProps,
          childrenColumnName,
          onExpand,
          onExpandedRowsChange,
        }
      : { childrenColumnName: "__noField__" };

  let table = (
    <Table
      className={classNames(styles.brickTable, {
        [styles.expandIconCellHidden]: !expandIconAsCell,
        [styles.customDropTable]: props.tableDraggable,
        [styles.tableThTransparent]: props.thTransparent,
        [styles.zebraPatternTable]: data?.length >= 2 && props.zebraPattern,
        [styles.xSmallSizeTable]: props.xSmallSizeTable,
      })}
      dataSource={data}
      {...(props.tableDraggable
        ? {
            components,
            onRow: (record, index) => ({
              index,
              moveRow: moveRow,
              acceptType: record.__acceptType || props.acceptType,
            }),
          }
        : {})}
      columns={customColumns}
      onChange={props.onChange}
      expandable={expandable}
      rowKey={rowKey}
      rowClassName={(record, index) => {
        if (record.invalidRow) {
          return styles.invalidRow;
        }
        if (record.disabledRow) {
          return styles.disabledRow;
        }
        return props.zebraPattern && index % 2 ? styles.brickTableOddRow : "";
      }}
      expandIcon={getCustomExpandIcon}
      scroll={scroll}
      showHeader={showHeader}
      {...configProps}
    />
  );

  const renderEmpty = () => {
    return (
      <>
        <EasyopsEmpty></EasyopsEmpty>
        <BrickAsComponent useBrick={props.emptyUseBrick.useBrick} />
      </>
    );
  };

  if (!data?.length && props.emptyUseBrick) {
    return (
      <ConfigProvider renderEmpty={() => renderEmpty()}>{table}</ConfigProvider>
    );
  }

  if (props.tableDraggable) {
    table = (
      <DndProvider backend={HTML5Backend} context={window}>
        {table}
      </DndProvider>
    );
  }

  if (!props.showCard) {
    return table;
  }

  return <Card bordered={false}> {table} </Card>;
}

BrickTable.defaultProps = {
  configProps: {
    pagination: true,
    sortBy: false,
  },
};
