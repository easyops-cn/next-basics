import React, { useEffect, useMemo } from "react";
import { Checkbox, Row, Col, Collapse } from "antd";
import { isNil, uniq } from "lodash";
import { CheckboxValueType, CheckboxOptionType } from "antd/lib/checkbox/Group";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { CheckboxType, OptionGroup } from "./index";
import styles from "./GeneralCheckbox.module.css";
import { CaretRightOutlined } from "@ant-design/icons";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";

export interface GeneralCheckboxProps extends FormItemWrapperProps {
  options?: CheckboxOptionType | IconCheckboxItem[] | CheckboxOtherOptionType;
  value?: CheckboxValueType[] | CheckboxValueType;
  colSpan?: number;
  onChange?: (value: CheckboxValueType[] | CheckboxValueType) => void;
  onChangeV2?: (value: any) => void;
  optionsChange?: (
    options: CheckboxOptionType | IconCheckboxItem[] | CheckboxOtherOptionType,
    name: string
  ) => void;
  optionGroups?: OptionGroup[];
  isGroup?: boolean;
  text?: string;
  disabled?: boolean;
  type?: CheckboxType;
  isCustom?: boolean;
}
export interface IconCheckboxItem {
  icon?: MenuIcon;
  value: any;
  label?: any;
  disabled?: boolean;
}

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};
export interface CheckboxOtherOptionType extends CheckboxOptionType {
  checkboxColor?: string;
  icon?: MenuIcon | SrcIcon;
}

export interface IconCheckboxProps {
  options: IconCheckboxItem[];
  name: string;
  value?: any[];
  disabled?: boolean;
  isCustom?: boolean;
  onChange?: (checkList: any[]) => void;
  onChangeV2?: (checkList: any[]) => void;
  optionsChange?: (options: CheckboxOptionType[], name: string) => void;
}
export function IconCheckbox(props: IconCheckboxProps) {
  const {
    options,
    name,
    value = [],
    disabled = false,
    onChange,
    isCustom = false,
  } = props;
  /**
   * 选中事件
   * @param value
   * @param checked
   */
  const checkItem = (val: any, checked: boolean) => {
    let newCheckedList: any[] = [...value];
    newCheckedList = checked
      ? [...newCheckedList, val]
      : newCheckedList.filter((v) => v !== val);
    onChange && onChange(newCheckedList);
  };
  return (
    <>
      {options.map((item: any) => (
        <label
          htmlFor={item.value}
          key={item.value}
          className={
            disabled || item?.disabled
              ? classNames(styles.disabledIconCheckbox, {
                  [styles.disabledIconCustomCheckbox]: isCustom,
                })
              : classNames(styles.iconCheckbox, {
                  [styles.iconCustomCheckbox]: isCustom,
                })
          }
        >
          <div className={styles.inputBox}>
            <input
              type="checkbox"
              value={item.value}
              name={name}
              id={item.value}
              checked={value.includes(item.value)}
              disabled={disabled || item?.disabled}
              onChange={() =>
                checkItem(item.value, !value.includes(item.value))
              }
            />
          </div>
          <div className={styles.content}>
            {item.icon && (
              <GeneralIcon
                style={{
                  fontSize: isCustom ? "52px" : "32px",
                }}
                size={isCustom ? 52 : 32}
                icon={item.icon}
              ></GeneralIcon>
            )}
            <div className={styles.text}>{item.label || item.value}</div>
          </div>
        </label>
      ))}
    </>
  );
}
export function GeneralCheckboxItem(
  props: GeneralCheckboxProps
): React.ReactElement {
  const {
    formElement,
    onChange,
    optionsChange,
    colSpan,
    optionGroups,
    isGroup,
    text,
    disabled,
    value,
    options,
    type,
    ...inputProps
  } = props;

  useEffect(() => {
    const _options = props.isGroup
      ? optionGroups
        ? optionGroups.reduce(
            (before, after) => [
              ...before,
              ...after.options.map((item) => ({ ...item, type: after.key })),
            ],
            []
          )
        : []
      : props.options;
    optionsChange?.(_options, props.name);
  }, [props.options, props.isGroup, props.optionGroups]);

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
    const checkboxColor = (item as CheckboxOtherOptionType)?.checkboxColor;
    const checkboxColorStyle = checkboxColor
      ? `checkbox-${checkboxColor}`
      : undefined;

    const icon = (item as CheckboxOtherOptionType)?.icon;
    let iconNode: JSX.Element = null;
    if (icon) {
      if ("imgSrc" in icon) {
        const mergedIcon: SrcIcon = {
          imgSrc: icon.imgSrc,
          imgStyle: {
            marginRight: "8px",
            verticalAlign: "-0.42em",
            ...icon.imgStyle,
          },
        };
        iconNode = <GeneralIcon icon={mergedIcon} size={22} />;
      } else {
        iconNode = (
          <GeneralIcon
            icon={icon}
            style={{
              fontSize: "22px",
              marginRight: "8px",
              verticalAlign: "-0.25em",
            }}
            size={22}
          />
        );
      }
    }

    const checkbox = (
      <Checkbox
        value={item.value}
        key={item.value}
        disabled={!!item.disabled}
        className={styles[`${checkboxColorStyle}`]}
      >
        {iconNode}
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

  const handleChange = (checkList: any[]): void => {
    let _options = options as IconCheckboxItem[];
    _options = optionGroups
      ? optionGroups.reduce(
          (before, after) => [...before, ...after.options],
          []
        )
      : _options;
    const newValueV2 = _options?.filter((item) =>
      checkList.includes(item.value)
    );
    props.onChangeV2?.(newValueV2);
    onChange?.(checkList);
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
    const _options = optionGroups.reduce(
      (before, after) => [...before, ...after.options],
      []
    );
    props.onChangeV2?.(
      _options.filter((item) => newValue.includes(item.value))
    );
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
  if (type === "icon") {
    return (
      <IconCheckbox
        options={options}
        name={props.name}
        value={value}
        isCustom={props.isCustom}
        disabled={disabled}
        onChange={handleChange}
      />
    );
  }
  return (isGroup && optionGroups) || options?.length > 0 ? (
    <Checkbox.Group
      className={styles.generalCheckBox}
      value={value as CheckboxValueType[]}
      onChange={handleChange}
      style={{ width: "100%" }}
      data-testid="checkbox-form-item"
      {...inputProps}
    >
      {renderOptions()}
    </Checkbox.Group>
  ) : (
    <Checkbox
      checked={value as boolean}
      onChange={(e) => {
        onChange?.(e.target.checked);
      }}
      disabled={disabled}
    >
      {text}
    </Checkbox>
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
