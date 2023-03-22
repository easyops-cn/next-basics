import React, { useState, useMemo, useRef, useEffect } from "react";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  PlusOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./ConditionalFormat.module.css";
import {
  Modal,
  Select,
  Input,
  InputNumber,
  TimePicker,
  Slider,
  DatePicker,
} from "antd";
import { uniqueId, cloneDeep, isEmpty, isNil, keyBy } from "lodash";
import { OpType } from "../../VisualFormRulesSetting";
import moment from "moment";
import { InputGroup } from "../../../../../forms/src/input-with-unit/InputWithUnit";
import { LegacyUserSelectFormItem } from "../../../../../forms/src/user-or-user-group-select/UserOrUserGroupSelect";
import { CmdbObjectApi_getObjectRef } from "@next-sdk/cmdb-sdk";
import { handleHttpError } from "@next-core/brick-kit";
interface ConditionalFormatProps extends FormItemWrapperProps {
  value?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  originOptions?: { label: string; value: string }[];
  operationOptions?: { label: string; value: string; type: string }[];
  formChildren: Record<string, any>[];
}

interface Condition {
  origin: string;
  operation: string;
  compareValType?: string;
  value?: any;
  fieldValue?: string;
  op: string;
  conditionId?: string;
  rangeValue?: any[];
}

interface Group {
  groupId: string;
  conditions: Condition[];
}

interface GroupCondition {
  groups: Group[];
  op?: string;
}

const opOptions = [
  {
    label: "且",
    value: "and",
  },
  {
    label: "或",
    value: "or",
  },
];

const compareValTypeOptions = [
  {
    label: "字段值",
    value: "field",
  },
  {
    label: "固定值",
    value: "fixed",
  },
];

export function ConditionalFormat(
  props: ConditionalFormatProps
): React.ReactElement {
  const { originOptions, operationOptions, formChildren, value, onChange } =
    props;
  const [groupConditions, setGroupConditions] = useState({
    groups: [],
    op: "and",
  } as GroupCondition);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const groupNumRef = useRef(0);
  useEffect(() => {
    if (isEmpty(value) || isNil(value)) {
      setGroupConditions({
        groups: [],
        op: "and",
      });
      return;
    }
    const _value = cloneDeep(value);
    _value.groups?.forEach((group: Group) => {
      group.groupId = group.groupId ?? uniqueId("group_");
      group.conditions?.forEach((condition: Condition) => {
        condition.conditionId = condition.conditionId ?? uniqueId("condition_");
      });
    });
    setGroupConditions(_value);
  }, [value]);

  const addFilterCondition = (groupNum?: number) => {
    groupNumRef.current = groupNum;
    setIsModalOpen(true);
  };

  const updateGroupConditions = () => {
    const cloneData = cloneDeep(groupConditions);
    setGroupConditions(cloneData);
    onChange(cloneData);
  };

  const getGroup = () => {
    return {
      groupId: uniqueId("group_"),
      conditions: [] as Condition[],
    };
  };

  const addGroup = () => {
    if (groupConditions.groups.length === 0) {
      groupConditions.groups = [getGroup(), getGroup()];
    } else {
      groupConditions.groups.push(getGroup());
    }
    updateGroupConditions();
  };

  const getObjectList = async () => {
    // 获取USER表单项构件的固定值选择框的data
    try {
      const list = (
        await CmdbObjectApi_getObjectRef({
          ref_object: "USER,USER_GROUP",
        })
      ).data;
    } catch (e) {
      // istanbul ignore next
      handleHttpError(e);
    }
  };

  const getUserSelectValue = (value: Array<string>) => {
    // 加工USER表单项构件的固定值选择框的初始值
    const selectedUser: Array<string> = [];
    const selectedUserGroup: Array<string> = [];
    value.forEach((item) =>
      item.startsWith(":")
        ? selectedUserGroup.push(item)
        : selectedUser.push(item)
    );
    return { selectedUser, selectedUserGroup };
  };

  const handleConditionValueChange = (
    value: any,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].value = value;
    updateGroupConditions();
  };

  const getCompareValTypeOptions = (condition: Condition) => {
    // 根据condition情况获取比较类型，目前支持固定值和字段值
    const { operation, origin } = condition;
    const [originType] = origin.split(/\(([^)]*)\)/);
    if (originType === "SWITCH") {
      return compareValTypeOptions.filter((item) => item.value === "field");
    } else if (
      [
        "withinNumericalRange",
        "notWithinNumericalRange",
        "withinTimeRange",
        "notWithinTimeRange",
      ].includes(operation)
    ) {
      return compareValTypeOptions.filter((item) => item.value === "fixed");
    }
    return compareValTypeOptions;
  };

  const handleCompareValTypeChange = (
    value: string,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].compareValType =
      value;
    updateGroupConditions();
  };

  const handleConditionChange = (
    value: string,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].operation = value;
    // 切换operation时要重置compareType和value
    handleConditionValueChange(undefined, groupNum, conditionNum);
    handleCompareValTypeChange(
      getCompareValTypeOptions(
        groupConditions.groups[groupNum].conditions[conditionNum]
      )[0].value,
      groupNum,
      conditionNum
    );
    updateGroupConditions();
  };

  const handleConditionOpChange = (value: string, groupNum: number) => {
    groupConditions.groups[groupNum].conditions.forEach((item) => {
      item.op = value;
    });
    updateGroupConditions();
  };

  const handleConditionRangeValueChange = (
    value: any,
    groupNum: number,
    conditionNum: number,
    position?: number
  ) => {
    if (!groupConditions.groups[groupNum].conditions[conditionNum].rangeValue) {
      groupConditions.groups[groupNum].conditions[conditionNum].rangeValue = [];
    }
    if (!isNil(position)) {
      groupConditions.groups[groupNum].conditions[conditionNum].rangeValue[
        position
      ] = value;
    } else {
      groupConditions.groups[groupNum].conditions[conditionNum].rangeValue =
        value;
    }
    updateGroupConditions();
  };

  const handleConditionFieldValueChange = (
    fieldValue: string,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].fieldValue =
      fieldValue;
    updateGroupConditions();
  };

  const getOperationOptions = (origin: string) => {
    // 根据表单项构件的类型返回相应的operation
    const [originType, originName] = origin.split(/\(([^)]*)\)/);
    const originProperty = formChildren
      .map((item) => JSON.parse(item.properties))
      .find((item) => item.name === originName);
    const commonOp = operationOptions.filter(
      (item) => item.type === OpType.Common
    );
    const arrayOp = operationOptions.filter(
      (item) => item.type === OpType.Common || item.type === OpType.Array
    );
    const commonStringOp = operationOptions.filter(
      (item) =>
        item.type === OpType.Common ||
        (item.type === OpType.String &&
          item.value !== "in" &&
          item.value !== "notIn")
    );
    const advancedStringOp = operationOptions.filter(
      (item) => item.type === OpType.Common || item.type === OpType.String
    );
    const numberOp = operationOptions.filter(
      (item) => item.type === OpType.Common || item.type === OpType.Number
    );
    const timeOp = operationOptions.filter(
      (item) => item.type === OpType.Common || item.type === OpType.Time
    );

    switch (originType) {
      case "CHECKBOX":
        return arrayOp;
      case "RADIO":
        return advancedStringOp;
      case "EDITOR":
        return commonStringOp;
      case "SLIDE":
        return originProperty?.range ? commonOp : numberOp;
      case "SWITCH":
        return operationOptions.filter((item) =>
          [
            "equal",
            "notEqual",
            "isNil",
            "isNotNil",
            "isTrue",
            "isFalse",
          ].includes(item.value)
        );
      case "DATE":
        return timeOp;
      case "TIME":
        return timeOp;
      case "USER":
        return arrayOp;
      case "SELECT":
        return originProperty?.mode === "multiple" ||
          originProperty?.mode === "tags"
          ? arrayOp
          : advancedStringOp;
      case "AUTO-COMPLETE":
        return commonStringOp;
      case "INPUT-NUMBER":
        return numberOp;
      case "INPUT-WITH-UNIT":
        return numberOp;
      case "INPUT":
        return commonStringOp;
      case "TEXTAREA":
        return commonStringOp;
      case "OTHER":
        return commonOp;
    }
  };

  const getCompareValBrick = (
    condition: Condition,
    groupNum: number,
    conditionNum: number
  ) => {
    // 根据表单项构件的类型返回固定值的输入控件
    const { operation, origin } = condition;
    const [originType, originName] = origin.split(/\(([^)]*)\)/);
    const originProperty = formChildren
      .map((item) => JSON.parse(item.properties))
      .find((item) => item.name === originName);
    switch (originType) {
      case "INPUT-NUMBER":
        return operation === "withinNumericalRange" ||
          operation === "notWithinNumericalRange" ? (
          <div className={styles.rangeContainer}>
            <InputNumber
              style={{ width: "120px" }}
              placeholder="from"
              value={
                condition?.rangeValue?.length >= 1
                  ? condition.rangeValue[0]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  0
                )
              }
            />
            <div style={{ padding: "0 5px" }}>~</div>
            <InputNumber
              style={{ width: "120px" }}
              placeholder="to"
              value={
                condition?.rangeValue?.length >= 2
                  ? condition.rangeValue[1]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  1
                )
              }
            />
          </div>
        ) : (
          <InputNumber
            {...originProperty}
            style={{ width: "260px" }}
            value={condition.value}
            placeholder="Enter a value"
            onChange={(value) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        );
      case "INPUT-WITH-UNIT":
        return operation === "withinNumericalRange" ||
          operation === "notWithinNumericalRange" ? (
          <div className={styles.rangeContainer}>
            <InputGroup
              {...originProperty}
              inputBoxStyle={{ width: "100px" }}
              value={
                condition?.rangeValue?.length >= 1
                  ? condition.rangeValue[0]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  0
                )
              }
            />
            <div style={{ padding: "0 5px" }}>~</div>
            <InputGroup
              {...originProperty}
              inputBoxStyle={{ width: "100px" }}
              value={
                condition?.rangeValue?.length >= 2
                  ? condition.rangeValue[1]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  1
                )
              }
            />
          </div>
        ) : (
          <InputGroup
            {...originProperty}
            inputBoxStyle={{ width: "210px" }}
            value={condition.value}
            onChange={(value) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        );
      case "CHECKBOX":
        return (
          <Select
            {...originProperty}
            value={condition?.value ?? []}
            mode="multiple"
            placeholder="Select values"
            onChange={(value) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        );
      case "USER":
        return (
          <div className={styles.userSelectContainer}>
            <LegacyUserSelectFormItem
              {...originProperty}
              mergeUseAndUserGroup={true}
              value={getUserSelectValue(condition?.value ?? [])}
              objectMap={keyBy(
                originProperty?.objectList
                  ? originProperty?.objectList
                  : getObjectList(),
                "objectId"
              )}
              onChangeV2={(value) => {
                handleConditionValueChange(
                  value.map((v: any) => v.value),
                  groupNum,
                  conditionNum
                );
              }}
            />
          </div>
        );
      case "TIME":
        return operation === "withinTimeRange" ||
          operation === "notWithinTimeRange" ? (
          <TimePicker.RangePicker
            {...originProperty?.configProps}
            value={
              condition.rangeValue &&
              condition.rangeValue.map((r) =>
                moment(r, originProperty?.configProps?.format ?? "HH:mm:ss")
              )
            }
            onChange={(time: moment.Moment, timeString: string) =>
              handleConditionRangeValueChange(
                timeString,
                groupNum,
                conditionNum
              )
            }
          />
        ) : (
          <TimePicker
            {...originProperty?.configProps}
            value={
              condition.value &&
              moment(
                condition.value,
                originProperty?.configProps?.format ?? "HH:mm:ss"
              )
            }
            onChange={(time: moment.Moment, timeString: string) =>
              handleConditionValueChange(timeString, groupNum, conditionNum)
            }
          />
        );
      case "DATE":
        return operation === "withinTimeRange" ||
          operation === "notWithinTimeRange" ? (
          <DatePicker.RangePicker
            {...originProperty}
            value={
              condition.rangeValue &&
              condition.rangeValue.map((r) =>
                moment(
                  r,
                  originProperty?.configProps?.format ?? "ddd MMM DD YYYY"
                )
              )
            }
            onChange={(time: moment.Moment, timeString: string) =>
              handleConditionRangeValueChange(
                timeString,
                groupNum,
                conditionNum
              )
            }
          />
        ) : (
          <DatePicker
            {...originProperty}
            value={
              condition.value &&
              moment(
                condition.value,
                originProperty?.configProps?.format ?? "ddd MMM DD YYYY"
              )
            }
            onChange={(time: moment.Moment, timeString: string) =>
              handleConditionValueChange(timeString, groupNum, conditionNum)
            }
          />
        );
      case "SELECT":
        return originProperty?.mode === "multiple" ||
          originProperty?.mode === "tags" ||
          operation === "in" ||
          operation === "notIn" ? (
          <Select
            {...originProperty}
            value={condition?.value ?? []}
            mode="multiple"
            style={{ width: "260px" }}
            placeholder="Select values"
            onChange={(value) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        ) : (
          <Input
            style={{ width: "260px" }}
            value={condition.value}
            placeholder="Enter a value"
            onChange={(e) =>
              handleConditionValueChange(
                e?.target?.value,
                groupNum,
                conditionNum
              )
            }
          />
        );
      case "SLIDE":
        return originProperty?.range ? (
          <Input
            style={{ width: "260px" }}
            value={condition.value}
            placeholder="Enter a value"
            onChange={(e) =>
              handleConditionValueChange(
                e?.target?.value,
                groupNum,
                conditionNum
              )
            }
          />
        ) : operation === "withinNumericalRange" ||
          operation === "notWithinNumericalRange" ? (
          <div className={styles.rangeContainer}>
            <InputNumber
              style={{ width: "120px" }}
              placeholder="from"
              value={
                condition?.rangeValue?.length >= 1
                  ? condition.rangeValue[0]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  0
                )
              }
            />
            <div style={{ padding: "0 5px" }}>~</div>
            <InputNumber
              style={{ width: "120px" }}
              placeholder="to"
              value={
                condition?.rangeValue?.length >= 2
                  ? condition.rangeValue[1]
                  : undefined
              }
              onChange={(value) =>
                handleConditionRangeValueChange(
                  value,
                  groupNum,
                  conditionNum,
                  1
                )
              }
            />
          </div>
        ) : (
          <Slider
            {...originProperty}
            value={condition.value}
            style={{ width: "260px" }}
            onChange={(value: any) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        );
      case "RADIO":
        return operation === "in" || operation === "notIn" ? (
          <Select
            {...originProperty}
            value={condition?.value ?? []}
            mode="multiple"
            placeholder="Select values"
            onChange={(value) =>
              handleConditionValueChange(value, groupNum, conditionNum)
            }
          />
        ) : (
          <Input
            style={{ width: "260px" }}
            value={condition.value}
            placeholder="Enter a value"
            onChange={(e) =>
              handleConditionValueChange(
                e?.target?.value,
                groupNum,
                conditionNum
              )
            }
          />
        );
      case "SWITCH":
        return <></>;
      case "INPUT":
      case "EDITOR":
      case "AUTO-COMPLETE":
      case "TEXTAREA":
      default:
        return (
          <Input
            style={{ width: "260px" }}
            value={condition.value}
            placeholder="Enter a value"
            onChange={(e) =>
              handleConditionValueChange(
                e?.target?.value,
                groupNum,
                conditionNum
              )
            }
          />
        );
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    const createNewConditions = {
      origin,
      operation: operationOptions[0].value,
      op: opOptions[0].value,
      conditionId: uniqueId("condition_"),
    };
    if (groupConditions.groups.length === 0) {
      groupConditions.groups.push(getGroup());
    }
    groupConditions.groups[groupNumRef.current].conditions.push(
      createNewConditions
    );
    updateGroupConditions();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOriginChange = (value: string) => {
    setOrigin(value);
  };

  const deleteGroup = (index: number) => {
    const deleteNum = index + 1;
    groupConditions.groups.splice(deleteNum, 1);
    updateGroupConditions();
  };

  const handleGroupOpChange = (value: string) => {
    groupConditions.op = value;
    updateGroupConditions();
  };

  const deleteCondition = (groupNum: number, conditionNum: number) => {
    groupConditions.groups[groupNum].conditions.splice(conditionNum, 1);
    updateGroupConditions();
  };

  const getGroupConditions = useMemo(() => {
    return groupConditions.groups.map((group: Group, i: number) => {
      return (
        <>
          {group.conditions.map((condition: Condition, index: number) => {
            return (
              <>
                <div key={condition.conditionId} className={styles.group}>
                  <div className={styles.groupTop}>
                    <div className={styles.groupTopLeft}>
                      {index === 0 && (
                        <span className={styles.groupSpanWhen}>当</span>
                      )}
                      {index !== 0 && (
                        <span className={styles.groupSpanOrAnd}>
                          <Select
                            value={condition.op}
                            onChange={(value) =>
                              handleConditionOpChange(value, i)
                            }
                            placeholder="Select an op"
                            options={opOptions}
                            style={{ width: "60px" }}
                            bordered={false}
                          />
                        </span>
                      )}
                      <span className={styles.groupOrigin}>
                        {condition.origin}
                      </span>
                      <Select
                        value={condition.operation}
                        onChange={(value) =>
                          handleConditionChange(value, i, index)
                        }
                        placeholder="Select an operator"
                        options={getOperationOptions(condition.origin)}
                        bordered={false}
                        style={{ width: "auto", minWidth: "100px" }}
                      />
                    </div>
                    <div className={styles.groupTopRight}>
                      <DeleteOutlined
                        className={styles.conditionDelete}
                        onClick={() => deleteCondition(i, index)}
                      />
                    </div>
                  </div>
                  {!["isNil", "isNotNil", "isTrue", "isFalse"].includes(
                    condition.operation
                  ) && (
                    <div className={styles.groupBottom}>
                      <Select
                        value={condition.compareValType}
                        onChange={(value) =>
                          handleCompareValTypeChange(value, i, index)
                        }
                        placeholder="Select compare type"
                        options={getCompareValTypeOptions(condition)}
                        style={{ width: "120px", margin: "0 12px 0 60px" }}
                      />
                      {condition.compareValType !== "field" &&
                        getCompareValBrick(condition, i, index)}
                      {condition.compareValType === "field" && (
                        <Select
                          style={{ width: "260px" }}
                          value={condition.fieldValue}
                          placeholder="Select compare target"
                          onChange={(e) =>
                            handleConditionFieldValueChange(e, i, index)
                          }
                          options={originOptions}
                        />
                      )}
                    </div>
                  )}
                </div>
              </>
            );
          })}
          {groupConditions.groups.length > 1 && (
            <div
              className={styles.conditionalItem}
              onClick={() => addFilterCondition(i)}
            >
              <PlusOutlined />
              <span style={{ marginLeft: "5px" }}>条件</span>
            </div>
          )}
          {i !== groupConditions.groups.length - 1 && (
            <div>
              <div className={styles.customHr}>
                <div className={styles.groupSelect}>
                  <Select
                    value={groupConditions.op}
                    onChange={handleGroupOpChange}
                    options={opOptions}
                    style={{ width: "60px" }}
                    bordered={true}
                  />
                </div>
                <div
                  className={styles.groupClose}
                  onClick={() => deleteGroup(i)}
                >
                  <CloseCircleOutlined />
                </div>
              </div>
            </div>
          )}
        </>
      );
    });
  }, [groupConditions]);

  return (
    <div>
      <div>{getGroupConditions}</div>
      <div className={styles.conditionalWrap}>
        {groupConditions.groups.length < 2 && (
          <div
            className={styles.conditionalItem}
            onClick={() => addFilterCondition(0)}
          >
            <PlusOutlined />
            <span style={{ marginLeft: "5px" }}>添加筛选条件</span>
          </div>
        )}
        <div className={styles.conditionalItem} onClick={addGroup}>
          <PlusOutlined />
          <span style={{ marginLeft: "5px" }}>条件组</span>
        </div>
      </div>
      <Modal
        title="选择触发源"
        visible={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleCancel}
      >
        <Select
          value={origin}
          style={{ width: "100%" }}
          onChange={handleOriginChange}
          options={originOptions}
        />
      </Modal>
    </div>
  );
}

export function ConditionalFormatAdapter(props: ConditionalFormatProps) {
  return (
    <FormItemWrapper {...props}>
      <ConditionalFormat {...props} />
    </FormItemWrapper>
  );
}
