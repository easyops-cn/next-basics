import { Card, Table } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS } from "../i18n/constants";
import { isNil, toPath } from "lodash";
import styles from "./RankTable.module.css";
import { CustomColumn } from "../brick-table";
import { TableProps } from "antd/lib/table";
import { UseBrickConf } from "@next-core/brick-types";
import { getCustomComp, getCustomHeader } from "./RankTableHelper";
import classNames from "classnames";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrick } from "./index";

interface RankTableProps {
  header?: {
    title: string | UseBrick;
    extra?: string | UseBrick;
  };
  dataSource: Record<string, any>[];
  columns: CustomColumn[];
  configProps?: TableProps<any>;
  showCard?: boolean;
  rowKey?: string;
  scroll?: TableProps<unknown>["scroll"];
  size?: "default" | "small";
  onChange: any;
}

type ItemBrickDataMap = Map<unknown, BrickData>;
type BrickData = {
  cellData: unknown;
  rowData: Record<string, unknown>;
  columnIndex: number;
};

export function RankTable(props: RankTableProps): React.ReactElement {
  const { dataSource, columns, configProps, rowKey, scroll } = props;
  const columnTitleBrickDataMapRef = useRef<
    Map<CustomColumn, { title: unknown }>
  >(new Map());
  const useBrickItemBrickDataMapRef = useRef<
    Map<UseBrickConf, ItemBrickDataMap>
  >(new Map());

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

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const renderAwards = (trend?: number) => (
    <>
      <span
        className={classNames(styles.awards, {
          [styles.medalGold]: trend === 0,
          [styles.medalSilver]: trend === 1,
          [styles.medalBronze]: trend === 2,
          [styles.normalAwards]: trend !== 0 && trend !== 1 && trend !== 2,
        })}
        style={
          props.size === "small"
            ? {
                height: "24px",
                width: "24px",
                fontSize: "12px",
              }
            : {}
        }
      >
        {trend + 1}
      </span>
      &nbsp;&nbsp;
    </>
  );

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

        const Awards = index === 0 ? renderAwards : (): any => null;
        if (headerBrick?.useBrick || titleUseBrick) {
          if (titleUseBrick) {
            // eslint-disable-next-line no-console
            console.warn(
              "`titleUseBrick` of `<presentational-bricks.rank-table>` is deprecated, use `headerBrick` instead."
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
            itemBrickDataMap,
            Awards,
            props.size
          );
        } else if (valueSuffix) {
          // eslint-disable-next-line react/display-name
          columnConf.render = (value, record, index) => (
            <>
              {Awards(index)}
              {value + valueSuffix}
            </>
          );
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

        if (!columnConf.render) {
          // eslint-disable-next-line react/display-name
          columnConf.render = (text: string, record, trend) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              {Awards(trend)}
              <span style={{ flex: 1 }}>{text}</span>
            </div>
          );
        }

        return columnConf;
      });

      return customColumns;
    }
  }, [columns, rowKey]);

  const TrendBar = (
    <div className={styles.trendBar}>
      <span className={styles.yellowBar} />
      <span className={styles.blueBar} />
      <span className={styles.redBar} />
    </div>
  );

  const header = useMemo(() => {
    const { header } = props;
    if (!header || !header?.title) return null;

    return (
      <div
        className={styles.header}
        style={props.size === "small" ? { padding: "0px 0 10px 10px" } : {}}
      >
        <span className={styles.leftCell}>
          {TrendBar}
          {(header.title as UseBrick)?.useBrick ? (
            <BrickAsComponent
              useBrick={(header.title as UseBrick).useBrick}
              data={dataSource}
            />
          ) : (
            (header.title as string)
          )}
        </span>
        <span className={styles.rightCell}>
          {(header?.extra as UseBrick)?.useBrick ? (
            <BrickAsComponent useBrick={(header.extra as UseBrick).useBrick} />
          ) : (
            (header.extra as string)
          )}
        </span>
      </div>
    );
  }, [props.header]);

  const table = () => {
    return (
      <Table
        className={classNames(styles.brickTable)}
        dataSource={data}
        columns={customColumns}
        rowKey={rowKey}
        rowClassName={(record, index) =>
          index % 2 ? styles.brickTableOddRow : ""
        }
        scroll={scroll}
        {...configProps}
        pagination={false}
        onChange={props.onChange}
      />
    );
  };

  return (
    <div>
      {!props.showCard ? (
        <>
          {header}
          {table()}
        </>
      ) : (
        <Card bordered={false}>
          {header}
          {table()}
        </Card>
      )}
    </div>
  );
}
