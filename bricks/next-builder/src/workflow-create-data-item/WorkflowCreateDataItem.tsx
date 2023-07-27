import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import { Form, Tooltip, FormInstance } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import styles from "./WorkflowCreateDataItem.module.css";
import { WorkflowDataField } from "../shared/components/workflow-data-field/WorkflowDataField";
import { ValueTypeField } from "../shared/components/value-type-field/ValueTypeField";
import {
  requiredValidator,
  regexpValidator,
} from "../shared/components/value-type-field/custom-validator";
import { wrapperWorkflowDataItem } from "../shared/components/wrapper-workflow-data-item/wrapperWorkflowDataItem";
import classNames from "classnames";
import { processCreateFormValue } from "./processor";
import {
  TypeFieldItem,
  WorkflowDataItem,
  WorkFLowValueType,
  WorkflowValueInfo,
} from "../interface";

export type CreateDataItemValue = Record<string, WorkflowValueInfo>;
export interface WorkflowCreateDataItemProps extends FormItemWrapperProps {
  fieldList: TypeFieldItem[];
  dataList: WorkflowDataItem[];
  value?: CreateDataItemValue;
  onChange?: (data: any) => void;
}

export interface LegacyWorkflowCreateDataItemRef {
  validateFields: FormInstance["validateFields"];
}

// eslint-disable-next-line react/display-name
export const LegacyWorkflowCreateDataItem = forwardRef(
  (
    props: WorkflowCreateDataItemProps,
    ref: Ref<LegacyWorkflowCreateDataItemRef>
  ): React.ReactElement => {
    const { t } = useTranslation(NS_NEXT_BUILDER);
    const [form] = Form.useForm();
    const { value, onChange, fieldList, dataList } = props;

    useImperativeHandle(ref, () => ({
      validateFields: form.validateFields,
    }));

    const triggerChange = useCallback(
      (v: any) => {
        form.setFieldsValue(v);
        onChange?.(v);
      },
      [form, onChange]
    );

    useEffect(() => {
      form.setFieldsValue(processCreateFormValue(fieldList, value));
    }, [form, value, fieldList]);

    const handleValuesChange = (_, allValues: any): void => {
      onChange?.(allValues);
    };

    const handleLabelClick = useCallback(
      (field: TypeFieldItem, type: string): void => {
        const newType =
          type === WorkFLowValueType.EXPR
            ? WorkFLowValueType.CONST
            : WorkFLowValueType.EXPR;
        const currenValue = form.getFieldsValue();

        const originField = value?.[field.id];

        const newValue = {
          ...currenValue,
          [field.id]: {
            type: newType,
            value:
              originField?.type === newType ? originField.value : undefined,
          },
        };
        triggerChange(newValue);
      },
      [form, triggerChange, value]
    );

    const renderLabelNode = useCallback(
      (field: TypeFieldItem, type: string): React.ReactNode => {
        return (
          <Tooltip
            title={
              type === WorkFLowValueType.CONST
                ? t(K.USE_FLOW_STEP_FIELD)
                : t(K.USE_FLOW_CONST_VALUE)
            }
          >
            <span className={styles.labelWrapper}>
              {field.name}
              <SwapOutlined
                onClick={() => handleLabelClick(field, type)}
                className={classNames(styles.labelIcon, {
                  [styles.selected]: type === WorkFLowValueType.EXPR,
                })}
              />
            </span>
          </Tooltip>
        );
      },
      [handleLabelClick, t]
    );

    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={value}
        onValuesChange={handleValuesChange}
      >
        {fieldList?.map((item) => {
          const fieldValue = value?.[item.id];
          return (
            <Form.Item
              required={item.required}
              messageVariables={{ label: item.id }}
              name={item.id}
              label={renderLabelNode(item, fieldValue?.type)}
              key={item.id}
              rules={[
                ...(item.regex && fieldValue?.type === WorkFLowValueType.CONST
                  ? [
                      {
                        validator: (_, v, cb) =>
                          regexpValidator(_, v, cb, item),
                      },
                    ]
                  : []),
                ...(item.required ? [{ validator: requiredValidator }] : []),
              ]}
              getValueProps={(field) => ({ value: field?.value })}
              getValueFromEvent={(v) => ({
                type: fieldValue?.type,
                value: v,
              })}
            >
              {fieldValue?.type === WorkFLowValueType.EXPR ? (
                <WorkflowDataField dataList={dataList} />
              ) : (
                <ValueTypeField field={item} />
              )}
            </Form.Item>
          );
        })}
      </Form>
    );
  }
);

export const WorkflowCreateDataItem = wrapperWorkflowDataItem(
  LegacyWorkflowCreateDataItem
);
