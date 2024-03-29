import React, { useState, useEffect, useCallback, useMemo } from "react";
import { GeneralIcon } from "@next-libs/basic-components";
import { Form, Popover } from "antd";
import styles from "./ListEditor.module.css";
import { Condition, operationOptions } from "../constants";
import { isArray } from "lodash";

const COLUMN_KEY = Symbol.for("column_key");

interface ListEditor {
  name?: string;
  label?: string | React.ReactElement;
  value?: any[];
  getDefaultItem: (data: any) => Record<string, any>;
  renderFormItem?: (data: any) => React.ReactElement;
  onChange?: (data: any) => void;
}

interface Action {
  actionType: string;
  target: string;
}

const actionTypeMap = {
  show: "显示",
  hide: "隐藏",
};

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

const operationMap = Object.fromEntries(
  operationOptions.map((item) => {
    return [item.value, item.label];
  })
);

const formatValue = (condition: Condition) => {
  const { value, compareValType, operation, fieldValue, rangeValue } =
    condition;

  if (compareValType === "field") {
    return fieldValue;
  } else {
    switch (operation) {
      case "withinTimeRange":
      case "notWithinTimeRange":
      case "withinNumericalRange":
      case "notWithinNumericalRange":
        return isArray(rangeValue) ? ` ${rangeValue?.join(" ~ ")} ` : "";
      default:
        return isArray(value) ? `[ ${value?.join(" , ")} ]` : value;
    }
  }
};

let key = 0;

export function ListEditor({
  value,
  getDefaultItem,
  renderFormItem,
  onChange,
}: ListEditor): React.ReactElement {
  const [list, setList] = useState<any[]>(
    (value ?? []).map((item) => ({
      ...item,
      [COLUMN_KEY]: ++key,
    }))
  );

  useEffect(() => {
    setList(
      (value ?? []).map((item) => ({
        ...item,
        [COLUMN_KEY]: ++key,
      }))
    );
  }, [value]);

  const getActionsText = (actions: Action[]) => {
    return actions.map((item) => {
      return (
        <span key={item.target}>
          <span>{actionTypeMap[item.actionType]}</span>(
          <span className={styles.highlight}>{item.target}</span>)&nbsp;
        </span>
      );
    });
  };

  const getShowText = (item: any) => {
    const conditions: GroupCondition = item.conditions;
    const op = conditions.op;
    const groups = conditions?.groups ?? [];
    return (
      groups.length > 0 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className={styles.ruleTitle}>{item.title} </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span>
              <span className={styles.normal}>当满足条件</span>
              {groups.map((item, index) => {
                return (
                  <>
                    <span>
                      (
                      {item.conditions.map((v, i) => {
                        return (
                          <>
                            <span className={styles.highlight} key={v.origin}>
                              {v.origin} {operationMap[v.operation]}{" "}
                              {formatValue(v)}
                            </span>
                            {item.conditions.length - 1 !== i && (
                              <span>{opMap[v.op]}</span>
                            )}
                          </>
                        );
                      })}
                      )
                    </span>
                    {groups.length - 1 !== index && <span>{opMap[op]}</span>}
                  </>
                );
              })}
            </span>
            <span>{getActionsText(item.actions)}</span>
          </span>
        </div>
      )
    );
  };

  const handleRemoveItem = useCallback(
    (e: React.MouseEvent, item: any): void => {
      e.stopPropagation();
      const key = item[COLUMN_KEY];
      const newList = list.filter((item) => item[COLUMN_KEY] !== key);
      setList(newList);
      onChange(newList);
    },
    [list, onChange]
  );

  const handleAddListItem = (): void => {
    key++;
    const defaultValue = `RULE${list.length + 1}`;
    const newList = list.concat([
      { ...getDefaultItem(defaultValue), [COLUMN_KEY]: key },
    ]);
    setList(newList);
    onChange?.(newList);
  };

  const renderListForm = useCallback(
    (item: any): React.ReactElement => {
      const handleOnValuesChange = (changeValues: any): void => {
        const key = item[COLUMN_KEY];
        const newList = list.map((item) => {
          if (item[COLUMN_KEY] === key) {
            item = {
              ...item,
              ...changeValues,
            };
          }
          return item;
        });
        setList(newList);
        onChange?.(newList);
      };
      return (
        <Form
          layout="vertical"
          labelAlign="left"
          labelCol={{
            style: {
              minWidth: "112px",
            },
          }}
          onValuesChange={handleOnValuesChange}
          initialValues={{ ...item }}
        >
          {renderFormItem(item)}
        </Form>
      );
    },
    [list, onChange, renderFormItem]
  );

  const renderListContent = useMemo((): React.ReactElement => {
    return (
      <div className={styles.listContent}>
        {list.length ? (
          list.map((item, index) => {
            return (
              <Popover
                key={index}
                overlayStyle={{
                  zIndex: 999,
                  minWidth: "494px",
                }}
                content={renderListForm(item)}
                title="规则详情"
                trigger="click"
                placement="left"
              >
                <div className={styles.listItem}>
                  <span>{getShowText(item)}</span>
                  <span
                    onClick={(e) => handleRemoveItem(e, item)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <GeneralIcon
                      icon={{
                        lib: "easyops",
                        category: "assets-inventory",
                        icon: "out",
                        color: "red",
                      }}
                      style={{
                        padding: "2px",
                        border: "1px solid",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                </div>
              </Popover>
            );
          })
        ) : (
          <div className={styles.listEmptyItem}>No data</div>
        )}
      </div>
    );
  }, [list, renderListForm, handleRemoveItem]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listContent}>{renderListContent}</div>
      <span className={styles.addListItem} onClick={handleAddListItem}>
        <GeneralIcon
          icon={{
            lib: "easyops",
            category: "assets-inventory",
            icon: "xin",
            color: "blue",
          }}
          style={{
            marginRight: "4px",
          }}
        />
        添加
      </span>
    </div>
  );
}
