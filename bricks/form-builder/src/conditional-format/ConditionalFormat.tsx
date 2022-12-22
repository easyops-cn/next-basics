import React, { useState, useMemo, useRef, useEffect } from "react";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  PlusOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./ConditionalFormat.module.css";
import { Modal, Select, Input } from "antd";
import { uniqueId, cloneDeep } from "lodash";

interface ConditionalFormatProps extends FormItemWrapperProps {
  value?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  originOptions?: { label: string; value: string }[];
  operationOptions?: { label: string; value: string }[];
}

interface Candition {
  origin: string;
  operation: string;
  value: string;
  op: string;
  canditionId?: string;
}

interface Group {
  groupId: string;
  canditions: Candition[];
}

interface GroupCandition {
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
  const [groupCanditions, setGroupCanditions] = useState({
    groups: [],
    op: "and",
  } as GroupCandition);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const groupNumRef = useRef(0);

  useEffect(() => {
    if (!value) return;
    const _value = cloneDeep(value);
    _value.groups?.forEach((group: Group) => {
      group.groupId = uniqueId("group_");
      group.canditions?.forEach((candition: Candition) => {
        candition.canditionId = uniqueId("candition_");
      });
    });
    setGroupCanditions(cloneDeep(_value));
  }, []);

  const addFilterCandition = (groupNum?: number) => {
    groupNumRef.current = groupNum;
    setIsModalOpen(true);
  };

  const getGroup = () => {
    return {
      groupId: uniqueId("group_"),
      canditions: [] as Candition[],
    };
  };

  const updateGroupCanditions = () => {
    const cloneData = cloneDeep(groupCanditions);
    setGroupCanditions(cloneData);
    onChange(cloneData);
  };

  const addGroup = () => {
    if (groupCanditions.groups.length === 0) {
      groupCanditions.groups = [getGroup(), getGroup()];
    } else {
      groupCanditions.groups.push(getGroup());
    }
    updateGroupCanditions();
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    const createNewCanditions = {
      origin,
      operation: operationOptions[0].value,
      value: "",
      op: opOptions[0].value,
      canditionId: uniqueId("candition_"),
    };
    if (groupCanditions.groups.length === 0) {
      groupCanditions.groups.push(getGroup());
    }
    groupCanditions.groups[groupNumRef.current].canditions.push(
      createNewCanditions
    );
    updateGroupCanditions();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOriginChange = (value: string) => {
    setOrigin(value);
  };

  const deleteGroup = (index: number) => {
    const deleteNum = index + 1;
    groupCanditions.groups.splice(deleteNum, 1);
    updateGroupCanditions();
  };

  const handleGroupOpChange = (value: string) => {
    groupCanditions.op = value;
    updateGroupCanditions();
  };

  const handleCanditionChange = (
    value: string,
    groupNum: number,
    canditionNum: number
  ) => {
    groupCanditions.groups[groupNum].canditions[canditionNum].operation = value;
    updateGroupCanditions();
  };

  const handleCanditionOpChange = (value: string, groupNum: number) => {
    groupCanditions.groups[groupNum].canditions.forEach((item) => {
      item.op = value;
    });
    updateGroupCanditions();
  };

  const handleCanditionValueChange = (
    e: any,
    groupNum: number,
    canditionNum: number
  ) => {
    groupCanditions.groups[groupNum].canditions[canditionNum].value =
      e.target.value;
    updateGroupCanditions();
  };

  const deleteCandition = (groupNum: number, canditionNum: number) => {
    groupCanditions.groups[groupNum].canditions.splice(canditionNum, 1);
    updateGroupCanditions();
  };

  const getGroupCanditions = useMemo(() => {
    return groupCanditions.groups.map((group: Group, i: number) => {
      return (
        <>
          {group.canditions.map((candition: Candition, index: number) => {
            return (
              <>
                <div key={candition.canditionId} className={styles.group}>
                  {index === 0 && <span className={styles.groupSpan}>当</span>}
                  {index !== 0 && (
                    <span className={styles.groupSpan}>
                      <Select
                        value={candition.op}
                        onChange={(value) => handleCanditionOpChange(value, i)}
                        options={opOptions}
                        style={{ width: "60px" }}
                        bordered={false}
                      />
                    </span>
                  )}
                  <span className={styles.groupOrigin}>{candition.origin}</span>
                  <Select
                    value={candition.operation}
                    onChange={(value) => handleCanditionChange(value, i, index)}
                    options={operationOptions}
                    style={{ width: "120px" }}
                    bordered={false}
                  />
                  <Input
                    style={{ width: "160px" }}
                    value={candition.value}
                    onChange={(e) => handleCanditionValueChange(e, i, index)}
                  />
                  <DeleteOutlined
                    className={styles.canditionDelete}
                    onClick={() => deleteCandition(i, index)}
                  />
                </div>
              </>
            );
          })}
          {groupCanditions.groups.length > 1 && (
            <div
              className={styles.conditionalItem}
              onClick={() => addFilterCandition(i)}
            >
              <PlusOutlined />
              条件
            </div>
          )}
          {i !== groupCanditions.groups.length - 1 && (
            <div>
              <div className={styles.customHr}>
                <div className={styles.groupSelect}>
                  <Select
                    value={groupCanditions.op}
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
  }, [groupCanditions]);

  return (
    <div>
      <div>{getGroupCanditions}</div>
      <div className={styles.conditionalWrap}>
        {groupCanditions.groups.length < 2 && (
          <div
            className={styles.conditionalItem}
            onClick={() => addFilterCandition(0)}
          >
            <PlusOutlined />
            添加筛选条件
          </div>
        )}
        <div className={styles.conditionalItem} onClick={addGroup}>
          <PlusOutlined />
          条件组
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
