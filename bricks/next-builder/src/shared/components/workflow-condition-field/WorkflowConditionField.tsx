import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { Menu, Input, Dropdown, Button } from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { WorkflowDataField } from "../workflow-data-field/WorkflowDataField";
import { ValueTypeField } from "../value-type-field/ValueTypeField";
import { conditionValueTypeList, EXIST_COMPARATOR } from "./constants";
import {
  TypeFieldItem,
  WorkflowCondition,
  ComparatorOption,
  WorkflowDataItem,
  WorkFLowValueType,
  TypeFieldGroup,
} from "../../../interface";
import { processFieldGroup, filterFieldOptions } from "./processor";
import styles from "./WorkflowConditionField.module.css";

interface WorkflowConditionFieldProps {
  isFirst?: boolean;
  value?: WorkflowCondition;
  field?: TypeFieldItem;
  comparatorMap?: Record<string, ComparatorOption[]>;
  logicTypeValue?: string;
  logicTypeList?: ComparatorOption[];
  dataList?: WorkflowDataItem[];
  onChange?: (value: WorkflowCondition) => void;
  onLogicTypeChange?: (type: string) => void;
  onDelete?: () => void;
}

export function WorkflowConditionField(
  props: WorkflowConditionFieldProps
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const {
    isFirst,
    value,
    field,
    dataList,
    logicTypeValue,
    logicTypeList,
    comparatorMap,
    onLogicTypeChange,
    onDelete,
    onChange,
  } = props;

  const [existComparator, setExistComparator] = useState<boolean>(
    value?.comparator?.startsWith(EXIST_COMPARATOR)
  );

  const curLabel = useMemo(
    () =>
      comparatorMap[field.originType]?.find(
        (item) => item.id === value?.comparator
      )?.name,
    [value?.comparator, field.originType, comparatorMap]
  );

  const curLogicType = useMemo(
    () => logicTypeList?.find((item) => item.id === logicTypeValue)?.name,
    [logicTypeList, logicTypeValue]
  );

  const curValueType = useMemo(
    () =>
      value?.valueInfo?.type &&
      conditionValueTypeList.find((item) => item.id === value.valueInfo.type)
        ?.name,
    [value?.valueInfo?.type]
  );

  const handleValueChange = (type: WorkFLowValueType, v: any): void => {
    onChange({ ...value, valueInfo: { type, value: v } });
  };

  const handleComparatorChange = (id: string): void => {
    if (id.startsWith(EXIST_COMPARATOR)) {
      setExistComparator(true);
      onChange({
        ...value,
        valueInfo: {
          type: value.valueInfo?.type,
          value: undefined,
        },
        comparator: id,
      });
    } else {
      setExistComparator(false);
      onChange({ ...value, comparator: id });
    }
  };

  const curValueInfo = value?.valueInfo;

  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.fieldKeyWrapper}>
        {isFirst ? (
          <span className={styles.firstLabel}>{t(K.WHEN)}</span>
        ) : (
          <FieldDropdownButton
            options={logicTypeList}
            hiddenSearch={true}
            onClick={onLogicTypeChange}
          >
            {curLogicType} <DownOutlined />
          </FieldDropdownButton>
        )}

        <span>
          {field.groupLabel ? `${field.groupLabel}.${field.name}` : field.name}
        </span>
        <FieldDropdownButton
          options={comparatorMap[field.originType]}
          onClick={(id) => handleComparatorChange(id)}
        >
          {curLabel} <DownOutlined />
        </FieldDropdownButton>

        {!existComparator && (
          <>
            <FieldDropdownButton
              hiddenSearch
              options={conditionValueTypeList}
              onClick={(v) =>
                onChange({
                  ...value,
                  valueInfo: { type: v as WorkFLowValueType, value: undefined },
                })
              }
            >
              {curValueType} <DownOutlined />
            </FieldDropdownButton>
          </>
        )}
        <DeleteOutlined className={styles.deleteIcon} onClick={onDelete} />
      </div>
      {!existComparator && (
        <div>
          {curValueInfo?.type === WorkFLowValueType.EXPR ? (
            <WorkflowDataField
              dataList={dataList}
              value={curValueInfo?.value}
              onChange={(v) => handleValueChange(WorkFLowValueType.EXPR, v)}
            />
          ) : (
            <ValueTypeField
              field={field}
              value={curValueInfo?.value}
              onChange={(v) => handleValueChange(WorkFLowValueType.CONST, v)}
            />
          )}
        </div>
      )}
    </div>
  );
}

type FieldDropdownOption = Partial<TypeFieldItem>;
interface FieldDropdownButtonProps {
  options: FieldDropdownOption[];
  onClick?: (id: string) => void;
  children?: React.ReactNode;
  hiddenSearch?: boolean;
}

export function FieldDropdownButton(
  props: FieldDropdownButtonProps
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { options, onClick, children, hiddenSearch } = props;
  const [filterOptions, setFilterOptions] = useState(options);
  const [visible, setVisible] = useState(false);
  const [q, setQ] = useState<string>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const v = e.target.value;
      setQ(v);
      const filter = filterFieldOptions(options, v);
      setFilterOptions(filter);
    },
    [options]
  );

  const handleItemClick = useCallback(
    (id: string): void => {
      onClick?.(id);
      setVisible(false);
    },
    [onClick]
  );

  useEffect(() => {
    if (visible) {
      setQ("");
      setFilterOptions(options);
    }
  }, [visible, options]);

  const getMenuItem = useCallback(
    (item: FieldDropdownOption) => {
      return (
        <Menu.Item key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </Menu.Item>
      );
    },
    [handleItemClick]
  );

  const menu = useMemo(
    () => (
      <Menu className={styles.dropdownMenu}>
        <Input
          hidden={hiddenSearch}
          value={q}
          className={styles.search}
          onChange={handleChange}
          placeholder={t(K.SEARCH_FIELD)}
        />
        {processFieldGroup(filterOptions)?.map((item, index) =>
          item.groupId ? (
            <Menu.ItemGroup title={item.groupLabel} key={index}>
              {(item as TypeFieldGroup).children?.map((child) =>
                getMenuItem(child)
              )}
            </Menu.ItemGroup>
          ) : (
            getMenuItem(item)
          )
        )}
      </Menu>
    ),
    [filterOptions, getMenuItem, handleChange, hiddenSearch, q, t]
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={(open) => setVisible(open)}
    >
      <Button type="link" className={styles.addBtn}>
        {children}
      </Button>
    </Dropdown>
  );
}
