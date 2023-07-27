import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Form, Select, Button, Divider, Input, Tooltip } from "antd";
import { SwapOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import update from "immutability-helper";
import classNames from "classnames";
import { FormItemWrapperProps } from "@next-libs/forms";
import { get } from "lodash";
import { WorkflowDataField } from "../shared/components/workflow-data-field/WorkflowDataField";
import { ValueTypeField } from "../shared/components/value-type-field/ValueTypeField";
import { regexpValidator } from "../shared/components/value-type-field/custom-validator";
import {
  wrapperWorkflowDataItem,
  DataItemRef,
} from "../shared/components/wrapper-workflow-data-item/wrapperWorkflowDataItem";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import {
  TypeFieldItem,
  WorkflowDataItem,
  WorkFLowValueType,
} from "../interface";
import sharedStyles from "../workflow-create-data-item/WorkflowCreateDataItem.module.css";
import styles from "../workflow-edit-data-item/WorkflowEditDataItem.module.css";

interface DataItemValue {
  fieldKey: string;
  valueInfo: {
    type: WorkFLowValueType;
    value: any;
  };
}
interface WorkflowEditDataItemProps extends FormItemWrapperProps {
  fieldList: TypeFieldItem[];
  dataList: WorkflowDataItem[];
  value?: DataItemValue[];
  onChange?: (data: any) => void;
}

const DYNAMIC_EDIT_ITEM = "dynamicEditItem";

// eslint-disable-next-line react/display-name
export const LegacyWorkflowEditDataItem = forwardRef(
  (
    props: WorkflowEditDataItemProps,
    ref: Ref<DataItemRef>
  ): React.ReactElement => {
    const { t } = useTranslation(NS_NEXT_BUILDER);

    const [form] = Form.useForm();
    const { value, onChange, fieldList, dataList } = props;

    useEffect(() => {
      form.setFieldsValue({ [DYNAMIC_EDIT_ITEM]: value });
    }, [value, form]);

    const handleValuesChange = (_, allValues: any): void => {
      onChange?.(allValues?.[DYNAMIC_EDIT_ITEM]);
    };

    useImperativeHandle(ref, () => ({
      validateFields: form.validateFields,
    }));

    const handleLabelClick = useCallback(
      (curValue: DataItemValue[], name: number): void => {
        const rowValue = curValue?.[name];
        const type = rowValue?.valueInfo?.type;

        const newType =
          type === WorkFLowValueType.EXPR
            ? WorkFLowValueType.CONST
            : WorkFLowValueType.EXPR;

        const newRowValue = {
          ...rowValue,
          valueInfo: {
            type: newType,
            value: undefined,
          },
        } as DataItemValue;

        const newCurValue = update(curValue, {
          [name]: {
            $set: newRowValue,
          },
        });

        form.setFieldsValue({ [DYNAMIC_EDIT_ITEM]: newCurValue });

        onChange(newCurValue);
      },
      [form, onChange]
    );

    const renderLabelNode = useCallback(
      (name: number): React.ReactNode => {
        const curValue = form.getFieldValue(DYNAMIC_EDIT_ITEM);
        const rowValue = curValue?.[name];
        const type = rowValue?.valueInfo?.type;

        return (
          <Tooltip
            title={
              type === WorkFLowValueType.CONST
                ? t(K.USE_FLOW_STEP_FIELD)
                : t(K.USE_FLOW_CONST_VALUE)
            }
          >
            <span className={sharedStyles.labelWrapper}>
              {t(K.SET_TO_NEW_VALUE)}
              <SwapOutlined
                onClick={() => handleLabelClick(curValue, name)}
                className={classNames(sharedStyles.labelIcon, {
                  [sharedStyles.selected]: type === WorkFLowValueType.EXPR,
                })}
              />
            </span>
          </Tooltip>
        );
      },
      [form, handleLabelClick, t]
    );

    const handleKeyChange = (v: string, name: number): void => {
      const curValue = form.getFieldValue(DYNAMIC_EDIT_ITEM);
      const newValue = {
        fieldKey: v,
        valueInfo: {
          type: WorkFLowValueType.CONST,
        },
      };

      const newCurValue = update(curValue, {
        [name]: {
          $set: newValue,
        },
      });

      form.setFieldsValue({ [DYNAMIC_EDIT_ITEM]: newCurValue });

      onChange(newCurValue);
    };

    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={value}
        onValuesChange={handleValuesChange}
      >
        <Form.List name={DYNAMIC_EDIT_ITEM}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...resetFields }) => {
                return (
                  <div key={key} className={styles.formItem}>
                    <Form.Item
                      {...resetFields}
                      name={[name, "fieldKey"]}
                      label={t(K.CURRENT_FIELD)}
                    >
                      <Select
                        options={fieldList.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        onChange={(v) => handleKeyChange(v, name)}
                      />
                    </Form.Item>

                    <Form.Item
                      label={renderLabelNode(name)}
                      shouldUpdate={(prevValues, curValues) =>
                        get(prevValues, [
                          DYNAMIC_EDIT_ITEM,
                          name,
                          "fieldKey",
                        ]) !==
                        get(curValues, [DYNAMIC_EDIT_ITEM, name, "fieldKey"])
                      }
                    >
                      {({ getFieldValue }) => {
                        const rowValue = getFieldValue([
                          DYNAMIC_EDIT_ITEM,
                          name,
                        ]);

                        const fieldKey = rowValue?.fieldKey;

                        const fieldInfo = fieldList.find(
                          (item) => item.id === fieldKey
                        );

                        const valueType = rowValue?.valueInfo?.type;

                        if (!fieldKey) {
                          return <Input disabled />;
                        }

                        if (!fieldInfo) {
                          return (
                            <span className={styles.errorMsg}>
                              {t(K.EDIT_FIELD_NOT_FOUND_MSG)}
                            </span>
                          );
                        }

                        return (
                          <Form.Item
                            {...resetFields}
                            name={[name, "valueInfo"]}
                            rules={[
                              ...(fieldInfo.regex &&
                              valueType === WorkFLowValueType.CONST
                                ? [
                                    {
                                      validator: (_, v, cb) =>
                                        regexpValidator(_, v, cb, fieldInfo),
                                    },
                                  ]
                                : []),
                            ]}
                            getValueProps={(field) => ({
                              value: field?.value,
                            })}
                            getValueFromEvent={(v) => ({
                              type: valueType,
                              value: v,
                            })}
                          >
                            {valueType === WorkFLowValueType.EXPR ? (
                              <WorkflowDataField dataList={dataList} />
                            ) : (
                              <ValueTypeField field={fieldInfo} />
                            )}
                          </Form.Item>
                        );
                      }}
                    </Form.Item>

                    <Button
                      className={styles.removeIcon}
                      type="link"
                      danger
                      onClick={() => remove(name)}
                    >
                      <DeleteOutlined />
                    </Button>

                    <Divider />
                  </div>
                );
              })}
              <Button
                onClick={() => add({ valueInfo: { type: "const" } })}
                data-testid="add-field-button"
              >
                <PlusOutlined />
                {t(K.ADD_FIELD)}
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    );
  }
);

export const WorkflowEditDataItem = wrapperWorkflowDataItem(
  LegacyWorkflowEditDataItem
);
