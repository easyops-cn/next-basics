// istanbul ignore file
// Ignore tests temporarily
import React, { forwardRef, useEffect, useImperativeHandle, Ref } from "react";
import { useTranslation } from "react-i18next";
import { get, isEmpty } from "lodash";
import { FormItemWrapperProps } from "@next-libs/forms";
import { Form, Button, Select } from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import update from "immutability-helper";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import {
  wrapperWorkflowDataItem,
  DataItemRef,
} from "../shared/components/wrapper-workflow-data-item/wrapperWorkflowDataItem";
import {
  WorkflowConditionField,
  FieldDropdownButton,
} from "../shared/components/workflow-condition-field/WorkflowConditionField";
import styles from "./WorkflowCondition.module.css";
import {
  TypeFieldItem,
  WorkflowDataItem,
  WorkFLowValueType,
  WorkflowCondition,
  ComparatorOption,
} from "../interface";

enum ConditionOperator {
  AND = "$and",
  OR = "$or",
}

interface ConditionGroup {
  operator: ConditionOperator;
  conditions?: WorkflowCondition[];
}

interface ConditionValue {
  operator: ConditionOperator;
  groups?: ConditionGroup[];
}

interface WorkflowConditionItemProps extends FormItemWrapperProps {
  fieldList: TypeFieldItem[];
  dataList: WorkflowDataItem[];
  logicTypeList: ComparatorOption[];
  comparatorList: ComparatorOption[];
  value?: ConditionValue;
  onChange?: (data: any) => void;
}

const DYNAMIC_CONDITION_ITEM = "dynamicConditionItem";

// eslint-disable-next-line react/display-name
export const LegacyWorkflowConditionItem = forwardRef(
  (
    props: WorkflowConditionItemProps,
    ref: Ref<DataItemRef>
  ): React.ReactElement => {
    const { t } = useTranslation(NS_NEXT_BUILDER);

    const {
      value,
      fieldList,
      dataList,
      logicTypeList,
      comparatorList,
      onChange,
    } = props;
    const [form] = Form.useForm();

    useEffect(() => {
      form.setFieldsValue({ [DYNAMIC_CONDITION_ITEM]: value });
    }, [value, form]);

    useImperativeHandle(ref, () => ({
      validateFields: form.validateFields,
    }));

    const handleValuesChange = (_, allValues: any): void => {
      onChange?.(allValues?.[DYNAMIC_CONDITION_ITEM]);
    };

    const handleConditionAdd = (id: string): void => {
      const curValue = form.getFieldValue(DYNAMIC_CONDITION_ITEM);
      const defaultConditionItem = {
        fieldKey: id,
        comparator: "$eq",
        valueInfo: { type: WorkFLowValueType.CONST },
      };

      const index = curValue.groups.length - 1;
      const newValue = update(curValue, {
        groups: {
          [index]: {
            conditions: {
              $push: [defaultConditionItem],
            },
          },
        },
      });

      form.setFieldsValue({
        [DYNAMIC_CONDITION_ITEM]: newValue,
      });
    };

    const handleLogicTypeChange = (v: string): void => {
      const curValue = form.getFieldValue(DYNAMIC_CONDITION_ITEM);
      const newValue = { ...curValue, operator: v };
      form.setFieldsValue({
        [DYNAMIC_CONDITION_ITEM]: newValue,
      });
      onChange?.(newValue);
    };

    const handleConditionTypeChange = (v: string, index: number): void => {
      const curValue = form.getFieldValue(DYNAMIC_CONDITION_ITEM);
      const newValue = update(curValue, {
        groups: {
          [index]: {
            operator: {
              $set: v,
            },
          },
        },
      });
      form.setFieldsValue({
        [DYNAMIC_CONDITION_ITEM]: newValue,
      });
      onChange?.(newValue);
    };

    const isEmptyCondition = isEmpty(value?.groups);

    const addGroup = (): void => {
      const curValue = form.getFieldValue(DYNAMIC_CONDITION_ITEM);
      const groups = (curValue?.groups || []).concat({
        operator: ConditionOperator.AND,
        conditions: [] as WorkflowCondition[],
      });
      const newValue = {
        operator: curValue?.comparator || ConditionOperator.AND,
        groups,
      };
      form.setFieldsValue({
        [DYNAMIC_CONDITION_ITEM]: newValue,
      });

      onChange?.(newValue);
    };

    const removeGroup = (index: number): void => {
      const curValue = form.getFieldValue(DYNAMIC_CONDITION_ITEM);
      const newValue = update(curValue, {
        groups: {
          $splice: [[index, 1]],
        },
      });
      form.setFieldsValue({
        [DYNAMIC_CONDITION_ITEM]: newValue,
      });
      onChange?.(newValue);
    };

    return isEmptyCondition ? (
      <Button shape="round" onClick={addGroup}>
        {t(K.SET_FILTER_CONDITION)}
      </Button>
    ) : (
      <Form
        form={form}
        layout="vertical"
        initialValues={value}
        onValuesChange={handleValuesChange}
      >
        <Form.List name={[DYNAMIC_CONDITION_ITEM, "groups"]}>
          {(items) => (
            <>
              {items.map((item) => (
                <Form.Item key={item.key} noStyle>
                  <Form.List name={[item.name, "conditions"]}>
                    {(rows, { add: innerAdd, remove: innerRemove }) => {
                      return (
                        <>
                          {item.name !== 0 && (
                            <div className={styles.operatorWrapper}>
                              <Select
                                className={styles.operator}
                                options={logicTypeList?.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                }))}
                                value={form.getFieldValue([
                                  DYNAMIC_CONDITION_ITEM,
                                  "operator",
                                ])}
                                onChange={handleLogicTypeChange}
                              />
                              <CloseCircleOutlined
                                className={styles.deleteIcon}
                                onClick={() => removeGroup(item.name)}
                              />
                            </div>
                          )}

                          {rows.map((row) => {
                            const curGroupValue = form.getFieldValue([
                              DYNAMIC_CONDITION_ITEM,
                              "groups",
                              item.name,
                            ]);

                            const curConditionValue = get(curGroupValue, [
                              "conditions",
                              row.name,
                            ]);

                            const curFieldData = fieldList.find(
                              (item) => item.id === curConditionValue.fieldKey
                            );

                            return (
                              <Form.Item
                                {...row}
                                key={row.key}
                                name={[row.name]}
                              >
                                {curFieldData && (
                                  <WorkflowConditionField
                                    isFirst={row.name === 0}
                                    logicTypeList={logicTypeList}
                                    logicTypeValue={curGroupValue.operator}
                                    comparatorList={comparatorList}
                                    dataList={dataList}
                                    field={curFieldData}
                                    onDelete={() => innerRemove(row.name)}
                                    onLogicTypeChange={(type) =>
                                      handleConditionTypeChange(type, item.name)
                                    }
                                  />
                                )}
                              </Form.Item>
                            );
                          })}

                          {items.length - 1 !== item.name && (
                            <div>
                              <FieldDropdownButton
                                options={fieldList}
                                onClick={(id) =>
                                  innerAdd({
                                    fieldKey: id,
                                    comparator: "$eq",
                                    valueInfo: {
                                      type: WorkFLowValueType.CONST,
                                    },
                                  })
                                }
                              >
                                <PlusOutlined />
                                {t(K.CONDITION)}
                              </FieldDropdownButton>
                            </div>
                          )}
                        </>
                      );
                    }}
                  </Form.List>
                </Form.Item>
              ))}

              <div>
                <FieldDropdownButton
                  options={fieldList}
                  onClick={handleConditionAdd}
                >
                  <PlusOutlined />
                  {t(K.CONDITION)}
                </FieldDropdownButton>

                <Button
                  type="link"
                  className={styles.addBtn}
                  onClick={addGroup}
                >
                  <PlusOutlined />
                  {t(K.CONDITION_GROUP)}
                </Button>
              </div>
            </>
          )}
        </Form.List>
      </Form>
    );
  }
);

export const WorkflowConditionItem = wrapperWorkflowDataItem(
  LegacyWorkflowConditionItem
);
