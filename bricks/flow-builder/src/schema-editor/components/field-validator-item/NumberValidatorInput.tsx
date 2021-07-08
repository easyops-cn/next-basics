import React from "react";
import { Select, Input, InputNumber, Button } from "antd";
import { useTranslation } from "react-i18next";
import { PlusCircleOutlined, MinusOutlined } from "@ant-design/icons";
import update from "immutability-helper";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { compareMethodList } from "../../constants";
import { ValidateField } from "../../interfaces";
import styles from "./FieldValidatorItem.module.css";
import editorStyles from "../../SchemaEditor.module.css";

export interface NumberCompareItem {
  method: keyof Omit<ValidateField, "pattern">;
  value: number;
}

export interface NumberValidatorInputProps {
  value: NumberCompareItem[];
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  onChange?: (list: NumberCompareItem[]) => void;
}

export function NumberValidatorInput(
  props: NumberValidatorInputProps
): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);

  const handleChange = (
    value: string | number,
    field: "method" | "value",
    index: number
  ): void => {
    const newValue = update(props.value, {
      $splice: [[index, 1, { ...props.value[index], [field]: value }]],
    });
    props.onChange?.(newValue);
  };

  return (
    <div>
      {props.value?.map((item, index) => (
        <div key={index} className={styles.wrapper}>
          <Input.Group compact style={{ flex: 1 }}>
            <Select
              value={item.method}
              style={{ width: 100 }}
              placeholder={t(K.COMPARE_METHOD_PLANCEHOLDER)}
              onChange={(value) => handleChange(value, "method", index)}
            >
              {compareMethodList.map((name) => (
                <Select.Option key={name} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            <InputNumber
              value={item.value}
              style={{ width: "calc(100% - 100px)" }}
              min={0}
              step={1}
              placeholder={t(K.COMPARE_VALUE_PLANCEHOLDER)}
              onChange={(value) =>
                handleChange(value as number, "value", index)
              }
            />
          </Input.Group>
          <Button
            className={editorStyles.iconBtn}
            type="link"
            style={{ flexBasis: 30 }}
            onClick={() => props.onRemove(index)}
          >
            <MinusOutlined />
          </Button>
        </div>
      ))}
      <Button
        className={editorStyles.iconBtn}
        type="link"
        onClick={props.onAdd}
      >
        <PlusCircleOutlined />
      </Button>
    </div>
  );
}
