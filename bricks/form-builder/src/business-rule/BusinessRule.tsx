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

interface Action {
  actionType: string;
  target: string;
}

export interface DataSource {
  title?: string;
  visible?: boolean;
  uid?: string;
}

const actionTypeMap = {
  show: "显示",
  hide: "隐藏",
};

interface Condition {
  origin: string;
  operation: string;
  value: string;
  op: string;
  conditionId?: string;
}

interface Group {
  groupId: string;
  conditions: Condition[];
}

interface GroupCondition {
  groups: Group[];
  op?: string;
}

const opMap = {
  and: "并且",
  or: "或",
};

const operationMap = {
  equal: "等于",
  notEqual: "不等于",
  contain: "包含",
  notContain: "不包含",
};

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

  const getActionsText = (actions: Action[]) => {
    return actions.map((item) => {
      return (
        <div key={item.target}>
          <span>{(actionTypeMap as any)[item.actionType]}：</span>
          <span className={styles.highlight}>{item.target}</span>
        </div>
      );
    });
  };

  const getConditionsText = (conditions: GroupCondition) => {
    const op = conditions.op;
    const groups = conditions?.groups ?? [];
    return (
      groups.length > 0 && (
        <div>
          <span className={styles.normal}>当满足条件：</span>
          {groups.map((item, index) => {
            return (
              <>
                <span>
                  (
                  {item.conditions.map((v, i) => {
                    return (
                      <>
                        <span className={styles.highlight} key={v.origin}>
                          {v.origin} {(operationMap as any)[v.operation]} {v.value}
                        </span>
                        {item.conditions.length - 1 !== i && (
                          <span>{(opMap as any)[v.op]}</span>
                        )}
                      </>
                    );
                  })}
                  )
                </span>
                {groups.length - 1 !== index && <span>{(opMap as any)[op]}</span>}
              </>
            );
          })}
        </div>
      )
    );
  };

  const getText = (item: any) => {
    if (item.actionType === "display") {
      return (
        <>
          {getConditionsText(item.conditions)}
          {getActionsText(item.actions)}
        </>
      );
    } else if (item.actionType === "linkage") {
      return (
        <>
          {getConditionsText(item.conditions)}
          <div>
            <span className={styles.highlight}>{item.origin}</span>{" "}
            数据变更时触发{" "}
            <span className={styles.highlight}>{item.target}</span> 脚本执行
          </div>
        </>
      );
    } else if (item.actionType === "submit") {
      return (
        <>
          <span>
            表单提交时触发{" "}
            <span className={styles.highlight}>{item.target}</span> 脚本执行
          </span>
        </>
      );
    } else if (item.actionType === "update") {
      return (
        <>
          {getConditionsText(item.conditions)}
          <div>
            <span className={styles.highlight}>{item.origin}</span>{" "}
            数据变更时触发{" "}
            <span className={styles.highlight}>{item.target}</span> 脚本执行
          </div>
        </>
      );
    } else if (item.actionType === "setting") {
      return (
        <>
          {getConditionsText(item.conditions)}
          <div>
            <span className={styles.highlight}>{item.origin}</span>{" "}
            数据变更时设置{" "}
            <span className={styles.highlight}>{item.target}</span> 值为{" "}
            {item.settingValue}
          </div>
        </>
      );
    }
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
          <div className={styles.cardBody}>{getText(item)}</div>
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
