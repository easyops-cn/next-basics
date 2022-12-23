import React, { useState, useEffect } from "react";
import styles from "./BusinessRule.module.css";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popover, Empty } from "antd";

export interface TextShow {
  show: string;
  text: string;
}

export interface DataSource {
  ruleTitle: string;
  textArray: TextShow[][];
}

interface BusinessRuleProps {
  dataSource?: DataSource[];
  eventDataSource?: any;
  handleEdit: (dataSource: any) => void;
  handleDelete: (dataSource: any) => void;
}

export function BusinessRule(props: BusinessRuleProps): React.ReactElement {
  const { dataSource, eventDataSource, handleEdit, handleDelete } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => {
      setVisible(false);
    };
    document.addEventListener("click", fn, true);
    return () => {
      document.removeEventListener("click", fn, true);
    };
  }, []);

  const toolContent = (
    <>
      <div
        className={styles.toolItem}
        onClick={() => {
          setVisible(false);
          handleEdit && handleEdit(eventDataSource);
        }}
      >
        <EditOutlined />
        <span>编辑</span>
      </div>
      <div
        className={`${styles.toolItem} ${styles.danger}`}
        onClick={() => {
          setVisible(false);
          handleDelete && handleDelete(eventDataSource);
        }}
      >
        <DeleteOutlined />
        <span>删除</span>
      </div>
    </>
  );

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
    return dataSource?.map((item, index) => {
      return (
        <div key={index} className={styles.cardWrap}>
          <div className={styles.cardHead}>
            <h4>{item.ruleTitle}</h4>
            <div className={styles.cardTool}>
              <Popover content={toolContent} visible={visible} trigger="click">
                <EllipsisOutlined onClick={() => setVisible(!visible)} />
              </Popover>
            </div>
          </div>
          <div className={styles.cardBody}>{getText(item.textArray)}</div>
        </div>
      );
    });
  };

  return (
    <div data-testid="my-brick">
      {dataSource && dataSource.length > 0 && getCard()}
      {(!dataSource || (dataSource && dataSource.length === 0)) && <Empty />}
    </div>
  );
}
