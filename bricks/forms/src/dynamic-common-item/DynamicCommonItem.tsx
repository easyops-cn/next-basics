import React, {
  forwardRef,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { cloneDeep, keyBy, uniqueId, isEqual, omit } from "lodash";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import { FormItemWrapperProps } from "@next-libs/forms";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button } from "antd";
import style from "./DynamicCommonItem.module.css";
import classNames from "classnames";
import { encrypt, decrypt } from "../utils";

export type RowProps = Record<string, any>;

export interface BuiltInValidatorRule extends ValidationRule {
  uniq?: true;
}

export interface BaseColumnsProps {
  name: string;
  label?: string;
  rules?: BuiltInValidatorRule[];
  flex: string;
}

export interface BaseRowProps {
  row?: RowProps;
  rowIndex?: number;
  form?: FormItemWrapperProps["formElement"]["formUtils"];
  prefixId?: string;
  onChange?: (value: any, key: string) => void;
}

export interface CommonItemProps extends FormItemWrapperProps {
  value?: any;
  manualEditedValue?: any;
  onChange?: (data: RowProps[]) => void;
  onAdd?: () => void;
  onRemove?: (data: RowProps) => void;
  columns: any[];
  validator?: Pick<ValidationRule, "validator" | "message">[];
  disabledAddButton?: boolean;
  disabledDeleteButton?: boolean;
  hideAddButton?: boolean;
  hideDeleteButton?: boolean;
  showBackground?: boolean;
  emitChangeOnInit?: boolean;
  oneRowRequired?: boolean;
  rowDisabledhandler?: (value: RowProps, index: number) => boolean;
}

export const inputSpan = 21;
export const btnSpan = 3;

export function CommonItem(
  props: PropsWithChildren<CommonItemProps>,
  ref: any
): React.ReactElement {
  const {
    getFieldValue,
    setFieldsValue,
    validateFields,
  } = props.formElement.formUtils;
  const [, forceUpdate] = useState();
  const defaultRow = props.columns.reduce((obj: any, column) => {
    obj[column.name] = column.defaultValue;
    return obj;
  }, {});

  const encrypted = React.useRef([]);

  const [rows, setRows] = useState<RowProps[]>(() => {
    const value = getFieldValue(props.name) ?? props.value;

    if (!value) {
      return [];
    }

    encrypted.current = cloneDeep(value);

    const columnMap = keyBy(props.columns, "name");
    for (const row of value) {
      for (const [k, v] of Object.entries(row)) {
        if (columnMap[k]?.encrypt) {
          row[k] = decrypt(v as string);
        }
      }
    }

    return value;
  });

  const [trackRows, setTrackRows] = useState(() => {
    return Array(rows.length)
      .fill(0)
      .map(() => uniqueId());
  });

  const handleAdd = () => {
    setRows([...rows, defaultRow]);
    setTrackRows([...trackRows, uniqueId()]);

    // important! notify form to detect changes
    setFieldsValue({
      [props.name]: [...rows, defaultRow],
    });

    props.onAdd?.();
  };

  const handleRemove = (data: RowProps, index: number) => {
    const filter = rows.filter((row, i) => index !== i);

    // important! notify form to detect changes
    setFieldsValue({
      [props.name]: filter,
    });

    setRows(filter);
    setTrackRows(trackRows.filter((_, i) => index !== i));
    props.onRemove?.(data);
    encrypted.current = filter;
    props.onChange?.(encrypted.current);
  };

  const batchChange = (row, index) => {
    const newRows = cloneDeep(rows);
    newRows[index] = row;
    setRows(newRows);
    props.onChange?.(newRows);
    setFieldsValue({
      [props.name]: [...newRows],
    });
  };
  const handleChange = (value: string, name: string, index: number) => {
    const newRows = cloneDeep(rows);
    newRows[index][name] = value;
    setRows(newRows);

    // todo(ice): notify with encrypted data
    const rawData = cloneDeep(newRows);
    const cols = props.columns.filter((col) => col.encrypt);
    rawData.forEach((row) => {
      cols.forEach((col) => {
        if (row[col.name]) {
          row[col.name] = encrypt(row[col.name]);
        }
      });
    });
    encrypted.current = rawData;
    props.onChange?.(rawData);
  };

  const headers = (
    <Row gutter={14} type="flex" className={style.headRow}>
      {props.columns.map((item, index) => (
        <Col key={index} style={{ flex: item.flex ?? 1 }}>
          {item.label}
        </Col>
      ))}
    </Row>
  );

  useEffect(() => {
    props.emitChangeOnInit && props.onChange?.(encrypted.current);
  }, []);

  useEffect(() => {
    props.columns.forEach((column) => {
      const triggerValidate = column.rules?.some(
        (rule: BuiltInValidatorRule) => rule.uniq
      );
      if (triggerValidate) {
        rows.forEach((item, rowIndex) => {
          // 有值的时候才做唯一性校验
          item[column.name] &&
            validateFields([`${props.name}[${rowIndex}].${column.name}`]);
        });
      }
    });
  }, [rows]);

  useEffect(() => {
    const editedValue = props.manualEditedValue;
    if (editedValue) {
      setRows(editedValue);
      setFieldsValue({
        [props.name]: editedValue,
      });
    }
  }, [props.manualEditedValue]);

  const uniqValidator = (
    rule: any,
    value: string,
    callback: (v?: boolean) => void
  ) => {
    const reg = /\[(\d+)\]\.(\w+)/;
    const [, rowIndex, name] = reg.exec(rule.field);
    const valueList = rows
      .filter((_, index) => index !== Number(rowIndex))
      .map((item) => item[name]);
    if (value && valueList.includes(value)) {
      callback(false);
    } else {
      callback();
    }
    forceUpdate({});
  };

  const columns = props.columns.map((item) => {
    const rules = (item.rules ?? []).map((rule: BuiltInValidatorRule) => {
      if (rule.uniq) {
        return {
          validator: uniqValidator,
          message: rule.message,
        };
      }
      return rule;
    });

    return {
      ...item,
      rules,
    };
  });

  const hiddenDeleteBtnAtOneRow = props.oneRowRequired && rows.length === 1;

  return (
    <div
      ref={ref}
      className={classNames(style.dynamicForm, style.showBackground)}
    >
      {headers}
      {rows.map((row, index) => {
        return (
          <Row type="flex" gutter={12} key={trackRows[index]}>
            {React.cloneElement(props.children as React.ReactElement, {
              rowIndex: index,
              columns,
              srcObjectId: props?.srcObjectId,
              row: row,
              prefixId: `${props.name}[${index}]`,
              form: props.formElement.formUtils,
              batchChange: (row) => {
                batchChange(row, index);
              },
              onChange: (value: string, name: string) =>
                handleChange(value, name, index),
            })}
            <Col className={style.removeColumn}>
              {!props.hideDeleteButton && !hiddenDeleteBtnAtOneRow && (
                <Button
                  type="link"
                  disabled={
                    props.disabledDeleteButton ||
                    props.rowDisabledhandler?.(row, index)
                  }
                  className={style.operatorBtn}
                  onClick={() => {
                    handleRemove(row, index);
                  }}
                >
                  <MinusCircleOutlined />
                </Button>
              )}
            </Col>
          </Row>
        );
      })}
      <Row gutter={12} className={style.addButton}>
        <Col span={24}>
          {!props.hideAddButton && (
            <Button
              style={{ width: "100%" }}
              type="dashed"
              onClick={() => handleAdd()}
              disabled={props.disabledAddButton}
            >
              <PlusOutlined />
              添加
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export const DynamicCommonItem = forwardRef(CommonItem);
