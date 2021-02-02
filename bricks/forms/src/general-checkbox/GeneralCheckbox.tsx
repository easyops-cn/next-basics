import React, { forwardRef, useMemo } from "react";
import { Checkbox, Row, Col, Collapse } from "antd";
import { isNil, uniq } from "lodash";
import { CheckboxValueType, CheckboxOptionType } from "antd/lib/checkbox/Group";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { OptionGroup } from "./index";
import styles from "./GeneralCheckbox.module.css";
import { CaretRightOutlined } from "@ant-design/icons";

export interface GeneralCheckboxProps extends FormItemWrapperProps {
  options?: CheckboxOptionType[];
  value?: CheckboxValueType[];
  colSpan?: number;
  onChange?: (value: CheckboxValueType[]) => void;
  optionGroups?: OptionGroup[];
  isGroup?: boolean;
}

export function GeneralCheckboxItem(
  props: GeneralCheckboxProps
): React.ReactElement {
  const {
    formElement,
    onChange,
    colSpan,
    optionGroups,
    isGroup,
    value,
    options,
    ...inputProps
  } = props;
  const isGridType = !isNil(colSpan);
  const groupMap = useMemo(() => {
    if (optionGroups && isGroup) {
      return new Map<string, any>(
        optionGroups.map((group) => {
          return [
            group.key,
            {
              ...group,
              optionKeys: group.options.map((v) => v.value),
            },
          ];
        })
      );
    } else {
      return null;
    }
  }, [optionGroups, isGroup]);

  const groupStatusMap = useMemo(() => {
    if (groupMap) {
      const statusMap = new Map<string, any>(
        Array.from(groupMap, (v) => {
          const { optionKeys } = v[1];
          const checkedItems = new Set(
            value?.filter((v) => optionKeys.includes(v)) ?? []
          );
          const status = {
            indeterminate:
              checkedItems.size !== 0 &&
              checkedItems.size !== optionKeys.length,
            checked: checkedItems.size === optionKeys.length,
          };
          return [v[0], status];
        })
      );
      return statusMap;
    } else {
      return null;
    }
  }, [value, groupMap]);

  const getCheckboxItem = (
    item: CheckboxOptionType,
    isGridType: boolean
  ): React.ReactElement => {
    const checkbox = (
      <Checkbox value={item.value} key={item.value} disabled={!!item?.disabled}>
        {item.label}
      </Checkbox>
    );

    return isGridType ? (
      <Col key={item.value} span={colSpan}>
        {checkbox}
      </Col>
    ) : (
      checkbox
    );
  };

  const handleHeaderClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  const groupOnChange = (
    groupValue: CheckboxValueType[],
    groupKey: string
  ): void => {
    const toCheckAll = !!groupValue.length;
    const { optionKeys } = groupMap.get(groupKey);
    const newValue = toCheckAll
      ? uniq((value ?? []).concat(optionKeys))
      : value.filter((v) => !optionKeys.includes(v));
    onChange(newValue);
  };

  const getCheckboxGroup = (
    options: CheckboxOptionType[],
    isGridType: boolean
  ): React.ReactNode => {
    const groups = options.map((item) => getCheckboxItem(item, isGridType));
    return isGridType ? (
      <Row gutter={[16, 12]} className={styles.checkboxColLayout}>
        {groups}
      </Row>
    ) : (
      groups
    );
  };

  const renderOptions = (): React.ReactNode => {
    if (isGroup && optionGroups) {
      return (
        <Collapse
          className={styles.groupCollapse}
          defaultActiveKey={optionGroups.map((g) => g.key)}
          ghost
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {optionGroups.map((group) => (
            <Collapse.Panel
              header={
                <span onClick={handleHeaderClick}>
                  <Checkbox.Group
                    onChange={(v) => groupOnChange(v, group.key)}
                    value={
                      groupStatusMap?.get(group.key).checked ? [group.key] : []
                    }
                  >
                    <Checkbox
                      key={group.key}
                      value={group.key}
                      {...groupStatusMap?.get(group.key)}
                    >
                      {group.name}
                    </Checkbox>
                  </Checkbox.Group>
                </span>
              }
              key={group.key}
            >
              {getCheckboxGroup(group.options, isGridType)}
            </Collapse.Panel>
          ))}
        </Collapse>
      );
    } else {
      return getCheckboxGroup(options, isGridType);
    }
  };

  return (
    <Checkbox.Group
      className={styles.generalCheckBox}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      data-testid="checkbox-form-item"
      {...inputProps}
    >
      {renderOptions()}
    </Checkbox.Group>
  );
}

export function GeneralCheckbox(
  props: GeneralCheckboxProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <GeneralCheckboxItem {...props} />
    </FormItemWrapper>
  );
}
