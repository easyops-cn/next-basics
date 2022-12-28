import React, { useState, useEffect } from "react";
import styles from "./BusinessRule.module.css";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popover, Empty } from "antd";
import { cloneDeep, uniqueId } from "lodash";

export interface TextShow {
  show: string;
  text: string;
}

export interface DataSource {
  title: string;
  textArray: TextShow[][];
  visible?: boolean;
  uid?: string;
}

interface BusinessRuleProps {
  dataSource?: DataSource[];
  handleEdit: (dataSource: any) => void;
  handleDelete: (dataSource: any) => void;
}

export function BusinessRule(props: BusinessRuleProps): React.ReactElement {
  const { handleEdit, handleDelete } = props;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (!props.dataSource) {
      return;
    }
    const _dataSource = cloneDeep(props.dataSource);
    _dataSource.forEach((item) => {
      item.uid = uniqueId("event_");
      item.visible = false;
    });
    setDataSource(_dataSource);
    const fn = () => {
      _dataSource.forEach((item) => {
        item.visible = false;
      });
      setDataSource([..._dataSource]);
    };
    document.addEventListener("click", fn, true);
    return () => {
      document.removeEventListener("click", fn, true);
    };
  }, [props.dataSource]);

  const getText = (textArray: TextShow[][]) => {
    return textArray?.map((item: TextShow[], index: number) => {
      return (
        <div key={index}>
          {item?.map((val: TextShow) => {
            return (
              <span key={val.text} className={styles[val.show]}>
                {val.text}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const getCard = () => {
    return dataSource?.map((item) => {
      return (
        <div key={item.uid} className={styles.cardWrap}>
          <div className={styles.cardHead}>
            <h4>{item.title}</h4>
            <div className={styles.cardTool}>
              <Popover
                content={
                  <>
                    <div
                      className={styles.toolItem}
                      onClick={() => {
                        item.visible = false;
                        setDataSource([...dataSource]);
                        handleEdit && handleEdit(item);
                      }}
                    >
                      <EditOutlined />
                      <span>编辑</span>
                    </div>
                    <div
                      className={`${styles.toolItem} ${styles.danger}`}
                      onClick={() => {
                        item.visible = false;
                        setDataSource([...dataSource]);
                        handleDelete && handleDelete(item);
                      }}
                    >
                      <DeleteOutlined />
                      <span>删除</span>
                    </div>
                  </>
                }
                visible={item.visible}
                trigger="click"
              >
                <EllipsisOutlined
                  onClick={() => {
                    item.visible = !item.visible;
                    setDataSource([...dataSource]);
                  }}
                />
              </Popover>
            </div>
          </div>
          <div className={styles.cardBody}>{getText(item.textArray)}</div>
        </div>
      );
    });
  };

  return (
    <div data-testid="my-brick" className={styles.card}>
      {dataSource && dataSource.length > 0 && getCard()}
      {(!dataSource || (dataSource && dataSource.length === 0)) && <Empty />}
    </div>
  );
}
