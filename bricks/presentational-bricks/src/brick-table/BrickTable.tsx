import React, { useState, useEffect, useRef, useMemo } from "react";
import Icon from "@ant-design/icons";
import { Table, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableProps } from "antd/lib/table";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { getCellStyle } from "./brickTableHelper";
import { pickBy, isNil, toPath, isEqual } from "lodash";
import classNames from "classnames";
import styles from "./BrickTable.module.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CustomColumn, CustomColumnComponent } from "./index";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
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

export interface BrickTableProps {
  dataSource: Record<string, any>[];
  columns: CustomColumn[];
  configProps?: TableProps<any>;
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
  expandIcon?: {
    collapsedIcon: MenuIcon;
    expandedIcon: MenuIcon;
  };
  expandIconAsCell?: boolean;
  expandIconColumnIndex?: number;
  expandRowByClick?: boolean;
  defaultExpandAllRows?: boolean;
  onExpand?: (expanded: boolean, record: Record<string, any>) => void;
  onExpandedRowsChange?: (expandedRows: React.Key[]) => void;
  expandedRowKeys?: React.Key[];
  rowKey?: string;
  childrenColumnName?: string;
  tableDraggable?: boolean;
  onDrag?: (data: Record<string, any>[]) => void;
  zebraPattern?: boolean;
  scroll?: TableProps<unknown>["scroll"];
  optimizedColumns?: Array<string | number>;
}

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
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
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
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
    rowKey,
    expandIconAsCell,
    expandIconColumnIndex,
    childrenColumnName,
    deleteEnabled,
    scroll,
    optimizedColumns,
    onDelete, // 用于 brick form 中，will be deprecated
  } = props;

  const initData = useMemo(() => {
    return (
      props.dataSource &&
      (rowKey
        ? props.dataSource
        : props.dataSource.map((item, index) =>
            isNil(item.key) ? { ...item, key: index } : item
          ))
    );
  }, [props.dataSource, rowKey]);

  const [data, setData] = useState(initData);
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
          useBrick,
          component,
          valueSuffix,
          cellStatus,
          titleUseBrick,
          headerBrick,
          colSpanKey,
          rowSpanKey,
          ...columnConf
        } = column;
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

        if (useBrick || component) {
          let itemBrickDataMap: ItemBrickDataMap;

          if (useBrick) {
            itemBrickDataMap = useBrickItemBrickDataMapRef.current.get(
              useBrick
            );

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
        if (cellStatus || colSpanKey || rowSpanKey) {
          const innerRender = columnConf.render;
          columnConf.render = (value, item, index) => {
            return {
              children: innerRender ? innerRender(value, item, index) : value,
              props: {
                colSpan: item[colSpanKey],
                rowSpan: item[rowSpanKey],
                style: cellStatus && getCellStyle(cellStatus, item, value),
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

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = data[dragIndex];
    const newData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    setData(newData);
    props.onDrag && props.onDrag(newData);
  };

  const onExpand = (expanded: boolean, record: Record<string, any>) => {
    props.onExpand && props.onExpand(expanded, record);
  };

  const onExpandedRowsChange = (expandedRows: React.Key[]) => {
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

  const pickExpandProps = pickBy(
    {
      expandIconColumnIndex,
      expandIconAsCell,
      expandRowByClick: props.expandRowByClick,
      expandedRowKeys: props.expandedRowKeys,
      defaultExpandAllRows: props.defaultExpandAllRows,
    },
    (item) => !isNil(item)
  );

  let table = (
    <Table
      className={classNames(styles.brickTable, {
        [styles.expandIconCellHidden]: !expandIconAsCell,
        [styles.customDropTable]: props.tableDraggable,
      })}
      dataSource={data}
      {...(props.tableDraggable
        ? {
            components,
            onRow: (record, index) => ({
              index,
              moveRow: moveRow,
            }),
          }
        : {})}
      columns={customColumns}
      onChange={props.onChange}
      {...(props.expandedRowBrick
        ? {
            expandedRowRender,
          }
        : {})}
      {...pickExpandProps}
      onExpand={onExpand}
      onExpandedRowsChange={onExpandedRowsChange}
      rowKey={rowKey}
      childrenColumnName={childrenColumnName}
      rowClassName={(record, index) =>
        props.zebraPattern && index % 2 ? styles.brickTableOddRow : ""
      }
      expandIcon={getCustomExpandIcon}
      scroll={scroll}
      {...configProps}
    />
  );

  if (props.tableDraggable) {
    table = <DndProvider backend={HTML5Backend}>{table}</DndProvider>;
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
