import React from "react";
import styles from "./BusinessRule.module.css";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";

export interface TextShow {
  show: string;
  text: string;
}

interface BusinessRuleProps {
  textArray: [TextShow[]];
  ruleTitle: string;
  dataSource?: any;
  handleEdit: (dataSource: any) => void;
  handleDelete: (dataSource: any) => void;
}

export function BusinessRule(props: BusinessRuleProps): React.ReactElement {
  const toolContent = (
    <>
      <div
        className={styles.toolItem}
        onClick={() => props.handleEdit && props.handleEdit(props.dataSource)}
      >
        <EditOutlined />
        <span>编辑</span>
      </div>
      <div
        className={`${styles.toolItem} ${styles.danger}`}
        onClick={() =>
          props.handleDelete && props.handleDelete(props.dataSource)
        }
      >
        <DeleteOutlined />
        <span>删除</span>
      </div>
    </>
  );

  const getText = () => {
    return props.textArray?.map((item: TextShow[], index: number) => {
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

  return (
    <div data-testid="my-brick">
      <div className={styles.cardWrap}>
        <div className={styles.cardHead}>
          <h4>{props.ruleTitle}</h4>
          <div className={styles.cardTool}>
            <Popover content={toolContent} trigger="click">
              <EllipsisOutlined />
            </Popover>
          </div>
        </div>
        <div className={styles.cardBody}>{getText()}</div>
      </div>
    </div>
  );
}
