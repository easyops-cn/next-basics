import React, { useState, useMemo, useRef, useEffect } from "react";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  PlusOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./ConditionalFormat.module.css";
import { Modal, Select, Input } from "antd";
import { uniqueId, cloneDeep, isEmpty, isNil } from "lodash";

interface ConditionalFormatProps extends FormItemWrapperProps {
  value?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  originOptions?: { label: string; value: string }[];
  operationOptions?: { label: string; value: string }[];
}

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

export function ConditionalFormat(
  props: ConditionalFormatProps
): React.ReactElement {
  const { originOptions, operationOptions, onChange, value } = props;
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

  const getGroup = () => {
    return {
      groupId: uniqueId("group_"),
      conditions: [] as Condition[],
    };
  };

  const updateGroupConditions = () => {
    const cloneData = cloneDeep(groupConditions);
    setGroupConditions(cloneData);
    onChange(cloneData);
  };

  const addGroup = () => {
    if (groupConditions.groups.length === 0) {
      groupConditions.groups = [getGroup(), getGroup()];
    } else {
      groupConditions.groups.push(getGroup());
    }
    updateGroupConditions();
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    const createNewConditions = {
      origin,
      operation: operationOptions[0].value,
      value: "",
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

  const handleConditionChange = (
    value: string,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].operation = value;
    updateGroupConditions();
  };

  const handleConditionOpChange = (value: string, groupNum: number) => {
    groupConditions.groups[groupNum].conditions.forEach((item) => {
      item.op = value;
    });
    updateGroupConditions();
  };

  const handleConditionValueChange = (
    e: any,
    groupNum: number,
    conditionNum: number
  ) => {
    groupConditions.groups[groupNum].conditions[conditionNum].value =
      e.target.value;
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
                  {index === 0 && (
                    <span className={styles.groupSpanWhen}>当</span>
                  )}
                  {index !== 0 && (
                    <span className={styles.groupSpanOrAnd}>
                      <Select
                        value={condition.op}
                        onChange={(value) => handleConditionOpChange(value, i)}
                        options={opOptions}
                        style={{ width: "60px" }}
                        bordered={false}
                      />
                    </span>
                  )}
                  <span className={styles.groupOrigin}>{condition.origin}</span>
                  <Select
                    value={condition.operation}
                    onChange={(value) => handleConditionChange(value, i, index)}
                    options={operationOptions}
                    style={{ width: "120px" }}
                    bordered={false}
                  />
                  <Input
                    style={{ width: "160px" }}
                    value={condition.value}
                    onChange={(e) => handleConditionValueChange(e, i, index)}
                  />
                  <DeleteOutlined
                    className={styles.conditionDelete}
                    onClick={() => deleteCondition(i, index)}
                  />
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
