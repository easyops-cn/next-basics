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
import classNames from "classnames";
import {
  TypeFieldItem,
  WorkflowDataItem,
  WorkFLowValueType,
} from "../interface";

export interface WorkflowCreateDataItemProps extends FormItemWrapperProps {
  fieldList: TypeFieldItem[];
  dataList: WorkflowDataItem[];
  value?: any;
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
      form.setFieldsValue(value);
    }, [form, value]);

    const handleDataChange = (
      type: WorkFLowValueType,
      name: string,
      fieldValue: any
    ): void => {
      const currenValue = form.getFieldsValue();
      const newValue = {
        ...currenValue,
        [name]: {
          type,
          value: fieldValue,
        },
      };

      triggerChange(newValue);
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

    const RenderLabelNode = useCallback(
      (field: TypeFieldItem, type: string): React.ReactNode => {
        return (
          <Tooltip title={t(K.SWITCH_MODEL)}>
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

    const requiredValidator = ({ field }: any, v: any, cb: any): void => {
      if (!v?.value) {
        cb(t(K.REQUIRED_FIELD_MESSAGE, { name: field }));
      } else {
        cb();
      }
    };

    return (
      <Form form={form} layout="vertical" initialValues={value}>
        {fieldList?.map((item) => {
          const fieldValue = value?.[item.id];
          return (
            <Form.Item
              required={item.required}
              name={item.id}
              label={RenderLabelNode(item, fieldValue?.type)}
              key={item.id}
              rules={[
                ...(item.required ? [{ validator: requiredValidator }] : []),
              ]}
              getValueProps={(field) => ({ value: field?.value })}
              getValueFromEvent={(v) => ({ type: fieldValue?.type, value: v })}
            >
              {fieldValue?.type === WorkFLowValueType.EXPR ? (
                <WorkflowDataField
                  dataList={dataList}
                  onChange={(v) =>
                    handleDataChange(WorkFLowValueType.EXPR, item.id, v)
                  }
                />
              ) : (
                <ValueTypeField
                  field={item}
                  onChange={(v) =>
                    handleDataChange(WorkFLowValueType.CONST, item.id, v)
                  }
                />
              )}
            </Form.Item>
          );
        })}
      </Form>
    );
  }
);

export function WorkflowCreateDataItem(
  props: WorkflowCreateDataItemProps
): React.ReactElement {
  const workflowCreateDataItemRef = useRef<LegacyWorkflowCreateDataItemRef>();

  const validators = [
    {
      validator: () => {
        // istanbul ignore next
        return new Promise((resolve, reject) => {
          // To avoid outOfDate
          setTimeout(() => {
            workflowCreateDataItemRef.current
              .validateFields()
              .then(() => {
                resolve(null);
              })
              .catch(() => {
                reject(`${props.name} validate failed`);
              });
          });
        });
      },
    },
  ];

  return (
    <FormItemWrapper
      {...props}
      validator={validators.concat(props.validator || ([] as any))}
    >
      <LegacyWorkflowCreateDataItem
        fieldList={props.fieldList}
        dataList={props.dataList}
        ref={workflowCreateDataItemRef}
      />
    </FormItemWrapper>
  );
}
