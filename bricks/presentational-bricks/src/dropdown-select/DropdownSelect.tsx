import React, { useMemo, useState } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Menu, Dropdown } from "antd";
import { parseTemplate } from "@next-libs/cmdb-utils";
import { get } from "lodash";
import styles from "./DropdownSelect.module.css";
import { Option } from "../interfaces";
import { GeneralIcon } from "@next-libs/basic-components";

interface DropdownSelectProps {
  dataSource?: any[];
  value?: any;
  label?: string;
  labelFontSize?: string;
  placeholder?: string;
  optionTitle?: string;
  optionContent?: string;
  valuePath?: string;
  options?: Option[];
  onChange?(value: any, item: any): void;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  multipleSelect?: boolean;
  onSelect?: (keys: any) => void;
  buttonIcon?: any;
  multipleLabel?: string;
  dropdownButtonType?: "default" | "shape";
}

export function DropdownSelect(props: DropdownSelectProps): React.ReactElement {
  let {
    dataSource,
    value,
    labelFontSize,
    placeholder,
    optionTitle,
    optionContent,
    valuePath,
    options,
  } = props;
  if (!dataSource) {
    dataSource = [];
  }
  if (!optionTitle) {
    optionTitle = "#{item}";
  }
  if (!valuePath) {
    valuePath = "item";
  }
  const selectedItem = useMemo(
    () =>
      options
        ? options.find((option) => option.value === value)
        : dataSource.find((item) => get({ item }, valuePath) === value),
    [value]
  );
  const [visible, setVisible] = useState(false);

  const onClick = (item: any) => {
    if (props.onChange) {
      props.onChange(options ? item.value : get({ item }, valuePath), item);
    }

    setVisible(false);
  };

  const label = useMemo(() => {
    if (selectedItem) {
      if (options) {
        return selectedItem.label;
      } else {
        let _label = props.label;

        if (!_label) {
          _label = optionTitle;
        }

        return parseTemplate(_label, { item: selectedItem });
      }
    } else {
      return "";
    }
  }, [selectedItem, props.label, optionTitle]);
  const menu = useMemo(
    () => (
      <Menu>
        {options
          ? options.map((option) => (
              <Menu.Item
                className={option === selectedItem ? "active" : undefined}
                onClick={(e) => onClick(option)}
                key={String(option.value)}
              >
                <h4 className={styles.optionTitle}>{option.label}</h4>
                {option.content && (
                  <p className={styles.optionContent}>{option.content}</p>
                )}
              </Menu.Item>
            ))
          : dataSource.map((item, index) => {
              const context = { item };

              return (
                <Menu.Item
                  className={item === selectedItem ? "active" : undefined}
                  onClick={(e) => onClick(item)}
                  key={String(get(context, valuePath))}
                >
                  <h4 className={styles.optionTitle}>
                    {parseTemplate(optionTitle, context)}
                  </h4>
                  {optionContent && (
                    <p className={styles.optionContent}>
                      {parseTemplate(optionContent, context)}
                    </p>
                  )}
                </Menu.Item>
              );
            })}
      </Menu>
    ),
    [options, dataSource, selectedItem, optionTitle, optionContent]
  );
  const multiSelectMenu = useMemo(() => {
    return (
      <Menu
        style={{ maxHeight: "300px", overflow: "scroll" }}
        selectedKeys={props.selectedKeys}
        defaultSelectedKeys={props.selectedKeys}
        selectable
        multiple={true}
        onSelect={(e) => {
          // istanbul ignore next
          props.onSelect(e.selectedKeys);
        }}
        onDeselect={(e) => {
          // istanbul ignore next
          props.onSelect(e.selectedKeys);
        }}
      >
        {options
          ? options.map((option) => (
              <Menu.Item key={option.value}>
                <h4 className={styles.optionTitle}>{option.label}</h4>
                {option.content && (
                  <p className={styles.optionContent}>{option.content}</p>
                )}
              </Menu.Item>
            ))
          : dataSource.map((item, index) => {
              const context = { item };
              return (
                <Menu.Item key={String(get(context, valuePath))}>
                  <h4 className={styles.optionTitle}>
                    {parseTemplate(optionTitle, context)}
                  </h4>
                  {optionContent && (
                    <p className={styles.optionContent}>
                      {parseTemplate(optionContent, context)}
                    </p>
                  )}
                </Menu.Item>
              );
            })}
      </Menu>
    );
  }, [
    options,
    dataSource,
    selectedItem,
    optionTitle,
    optionContent,
    props.selectedKeys,
    props.defaultSelectedKeys,
  ]);

  return (
    <Dropdown
      overlay={props.multipleSelect ? multiSelectMenu : menu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={(visible) => {
        setVisible(visible);
      }}
    >
      {props.dropdownButtonType === "shape" ? (
        <div
          className={styles.dropdownTrigger}
          style={{
            fontSize: "14px",
            backgroundColor: "#F5F5F5",
            borderRadius: "4px",
            padding: "3px 10px",
          }}
          data-testid="dropdown-trigger-multiple"
        >
          {props.buttonIcon && (
            <GeneralIcon
              style={{ marginRight: "7px" }}
              icon={props.buttonIcon}
            />
          )}
          <div style={{ height: "50px" }}>
            <div className={styles.placeholder}>{placeholder}</div>
            <div className={styles.dropdownLabelBox}>
              {props.multipleSelect ? props.multipleLabel : label}
            </div>
          </div>
          <LegacyIcon
            type={visible ? "caret-up" : "caret-down"}
            className={styles.dropdownArrow}
          />
        </div>
      ) : (
        <div
          className={styles.dropdownTrigger}
          style={{ fontSize: labelFontSize }}
          data-testid="dropdown-trigger"
        >
          <div className={styles.dropdownLabel}>
            {label || <span className={styles.placeholder}>{placeholder}</span>}
          </div>
          <LegacyIcon
            type={visible ? "caret-up" : "caret-down"}
            className={styles.dropdownArrow}
          />
        </div>
      )}
    </Dropdown>
  );
}
