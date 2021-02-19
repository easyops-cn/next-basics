import React, { useEffect, useImperativeHandle, useState } from "react";
import { Form, Input, InputNumber, Radio, Select, Tooltip } from "antd";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import update from "immutability-helper";
import { isNil } from "lodash";
import styles from "./VisualPropertyForm.module.css";
import { FormInstance, FormProps } from "antd/lib/form";
import { CodeEditorFormItem } from "./CodeEditorFormItem";
import { mergeProperties, calculateValue } from "./processor";
import { OTHER_FORM_ITEM_FIELD } from "./constant";

type FormItemType = boolean | string | string[] | number | Record<string, any>;

enum Required {
  True = "true",
  False = "false",
}

export enum ItemModeType {
  Normal = "normal",
  Advanced = "andvanced",
}

export interface PropertyType {
  type: FormItemType;
  name: string;
  required?: Required;
  description?: string;
  default?: string;
}

export interface UnionPropertyType extends PropertyType {
  mode?: ItemModeType;
  value?: any;
  jsonSchema?: Record<string, any>;
  schemaRef?: string;
}

export type BrickProperties = Record<string, any>;
export interface visualFormUtils extends Partial<FormInstance> {
  resetPropertyFields: (
    typeList: PropertyType[],
    properties: BrickProperties
  ) => void;
}

export interface VisualPropertyFormProps {
  propertyTypeList: PropertyType[];
  labelIcon: {
    normal?: MenuIcon;
    advanced?: MenuIcon;
  };
  brickProperties: BrickProperties;
  onValuesChange?: FormProps["onValuesChange"];
  brickInfo?: {
    type: "brick" | "provider" | "template";
  };
}

export function LegacyVisualPropertyForm(
  props: VisualPropertyFormProps,
  ref: React.Ref<visualFormUtils>
): React.ReactElement {
  const { labelIcon, propertyTypeList, brickProperties, brickInfo } = props;
  const [form] = Form.useForm();
  const [typeList, setTypeList] = useState<UnionPropertyType[]>(
    mergeProperties(propertyTypeList, brickProperties)
  );

  useImperativeHandle(ref, () => ({
    validateFields: form.validateFields,
    resetPropertyFields: (
      typeList: PropertyType[],
      properties: BrickProperties
    ) => {
      const restValue = mergeProperties(typeList, properties);
      setTypeList(restValue);
      form.resetFields();
    },
  }));

  useEffect(() => {
    setTypeList(mergeProperties(propertyTypeList, brickProperties));
    form.setFieldsValue(calculateValue(propertyTypeList, brickProperties));
  }, [propertyTypeList, brickProperties]);

  const handleLabelClick = (name: string): void => {
    const selected = typeList.find((item) => item.name === name);
    const index = typeList.findIndex((item) => item.name === name);
    const nextMode =
      selected.mode === ItemModeType.Advanced
        ? ItemModeType.Normal
        : ItemModeType.Advanced;
    form.setFieldsValue({
      [name]:
        nextMode === ItemModeType.Normal
          ? selected.value
          : isNil(selected.value)
          ? ""
          : String(selected.value),
    });
    const newTypeList = update(typeList, {
      $splice: [[index, 1, { ...selected, mode: nextMode }]],
    });
    setTypeList(newTypeList);
  };

  const renderLabel = (item: UnionPropertyType): React.ReactElement => {
    return (
      <span>
        <Tooltip title={item.description}>{item.name}</Tooltip>{" "}
        {labelIcon && (
          <span
            className={styles.iconContainer}
            onClick={() => handleLabelClick(item.name)}
          >
            <GeneralIcon
              icon={
                item.mode === ItemModeType.Advanced
                  ? labelIcon?.advanced
                  : labelIcon.normal
              }
            />
          </span>
        )}
      </span>
    );
  };

  const renderEditorItem = (item: UnionPropertyType, hideIcon?: boolean) => {
    return (
      <CodeEditorFormItem
        key={item.name}
        name={item.name}
        label={hideIcon ? item.name : renderLabel(item)}
        required={item.required === Required.True}
        jsonSchema={item?.jsonSchema}
        schemaRef={item?.schemaRef}
        mode="brick_next_yaml"
      />
    );
  };

  const renderStringItem = (item: UnionPropertyType): React.ReactElement => {
    return item.mode === ItemModeType.Advanced ? (
      renderEditorItem(item)
    ) : (
      <Form.Item
        key={item.name}
        label={renderLabel(item)}
        name={item.name}
        rules={[
          {
            required: item.required === Required.True,
            message: `请输入${item.name}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    );
  };

  const renderBooleanItem = (item: UnionPropertyType): React.ReactElement => {
    return item.mode === ItemModeType.Advanced ? (
      renderEditorItem(item)
    ) : (
      <Form.Item
        key={item.name}
        label={renderLabel(item)}
        name={item.name}
        rules={[
          {
            required: item.required === Required.True,
            message: `请输入${item.name}`,
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>true</Radio>
          <Radio value={false}>false</Radio>
        </Radio.Group>
      </Form.Item>
    );
  };

  const renderInputNumberItem = (
    item: UnionPropertyType
  ): React.ReactElement => {
    return item.mode === ItemModeType.Advanced ? (
      renderEditorItem(item)
    ) : (
      <Form.Item
        key={item.name}
        label={renderLabel(item)}
        name={item.name}
        rules={[
          {
            required: item.required === Required.True,
            message: `请输入${item.name}`,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    );
  };

  const renderStringListItem = (
    item: UnionPropertyType
  ): React.ReactElement => {
    return item.mode === ItemModeType.Advanced ? (
      renderEditorItem(item)
    ) : (
      <Form.Item
        key={item.name}
        label={renderLabel(item)}
        name={item.name}
        rules={[
          {
            required: item.required === Required.True,
            message: `请输入${item.name}`,
          },
        ]}
      >
        <Select mode="tags" />
      </Form.Item>
    );
  };

  const renderCodeEditorItem = (item: PropertyType): React.ReactElement => {
    return renderEditorItem(item, true);
  };

  const getFormItem = (item: PropertyType): React.ReactElement => {
    switch (item.type) {
      case "string":
        return renderStringItem(item);
      case "string[]":
        return renderStringListItem(item);
      case "number":
        return renderInputNumberItem(item);
      case "boolean":
        return renderBooleanItem(item);
      default:
        return renderCodeEditorItem(item);
    }
  };

  return (
    <Form
      name="propertyForm"
      layout="vertical"
      form={form}
      onValuesChange={props.onValuesChange}
      initialValues={calculateValue(propertyTypeList, brickProperties)}
    >
      {typeList?.map((item) => {
        return getFormItem(item);
      })}
      <CodeEditorFormItem
        name={OTHER_FORM_ITEM_FIELD}
        label={
          brickInfo?.type === "template" ? "other params" : "other properties"
        }
        mode="brick_next_yaml"
      />
    </Form>
  );
}

export const VisualPropertyForm = React.forwardRef(LegacyVisualPropertyForm);
