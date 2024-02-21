import React, { useEffect, useRef } from "react";
import { Select, Spin, Avatar, Tooltip } from "antd";
import i18n from "i18next";
import { NS_FORMS, K } from "../i18n/constants";
import {
  debounce,
  get,
  compact,
  castArray,
  defaults,
  isEqual,
  difference,
  isNil,
  trim,
} from "lodash";
import { BrickAsComponent, handleHttpError } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { ModeOption } from "antd/lib/select";
import { InstanceApi_postSearchV3 } from "@next-sdk/cmdb-sdk";
import { getInstanceNameKey, parseTemplate } from "@next-libs/cmdb-utils";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import classNames from "classnames";

import style from "./CmdbInstanceSelect.module.css";

export interface CmdbInstanceSelectProps extends FormItemWrapperProps {
  objectId: string;
  mode?: string;
  pageSize?: number;
  instanceQuery?: any;
  placeholder?: string;
  fields?: Partial<ComplexOption<string>>;
  firstRender: boolean;
  minimumInputLength?: number;
  value?: any;
  onChange?: (value: string, option?: ComplexOption) => void;
  optionsChange: (options: ComplexOption[], name: string) => void;
  allowClear?: boolean;
  inputBoxStyle?: React.CSSProperties;
  extraSearchKey?: string[];
  extraFields?: string[];
  popoverPositionType?: "default" | "parent";
  isMultiLabel?: boolean;
  showSearchTip?: boolean;
  labelTemplate?: string;
  disabled?: boolean;
  permission?: Array<"read" | "update" | "operate">;
  showTooltip?: boolean;
  ignoreMissingFieldError?: boolean;
  showKeyField?: boolean;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: React.CSSProperties;
  blurAfterValueChanged?: boolean;
  sort?: Array<Record<string, number | string>>;
  suffix?: {
    useBrick: UseBrickConf;
  };
  useBrickVisible?: boolean;
}

export interface ComplexOption<T = string | number> {
  label: string[] | string;
  value: T;
  user_icon?: string; // objectId为USER的时候显示用户头像
}

export function formatUserQuery(instanceQuery: any) {
  const arr = Array.isArray(instanceQuery) ? instanceQuery : [instanceQuery];

  return compact(arr);
}

export function CmdbInstanceSelectItem(
  props: CmdbInstanceSelectProps,
  ref: any
): React.ReactElement {
  const {
    showKeyField,
    // 默认显示 label 为模型的 name/hostname, value 为 instanceId
    // 当showKeyField时，实例展示是用showKey里的数据展示
    fields = {
      label: [showKeyField ? "#showKey" : getInstanceNameKey(props.objectId)],
      value: "instanceId",
    },

    minimumInputLength = 0,
    extraSearchKey = [],
    extraFields = [],
    mode,
    placeholder,
    allowClear,
    pageSize,
    showSearchTip,
    permission,
    ignoreMissingFieldError,
    blurAfterValueChanged,
    suffix,
  } = props;
  const userQuery = formatUserQuery(props.instanceQuery);
  //istanbul ignore else
  if (!fields.value) {
    fields.value = "instanceId";
  }

  const [value, setValue] = React.useState<unknown>();
  const [objectId, setObjectId] = React.useState<string>();
  const [options, setOptions] = React.useState<ComplexOption[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<ComplexOption[]>(
    []
  );
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const computeFields = () => {
    const result = [
      fields.value,
      ...(Array.isArray(fields.label) ? fields.label : [fields.label]),
      ...extraSearchKey,
      ...extraFields,
    ];

    if (props.objectId === "USER") {
      result.push("user_icon");
    }
    return result;
  };

  const handleChange = (newValue: any): void => {
    let selected: any | any[];
    if (mode === "multiple") {
      const valueSet = new Set(newValue);
      selected = options.filter((item) => valueSet.has(item.value));
      const oldValueSet = new Set(
        difference(
          newValue,
          selected.map((item) => item.value)
        )
      );
      selected = selected.concat(
        selectedOptions.filter((item) => oldValueSet.has(item.value))
      );
    } else {
      selected = options.find((item) => item.value === newValue);
    }

    if (blurAfterValueChanged) {
      const selectNodes = document.getElementsByClassName(
        "formsCmdbInstSelect"
      );
      for (let i = 0; i < selectNodes.length; i++) {
        selectNodes[i].getElementsByTagName("input")?.[0]?.blur();
      }
    }
    setValue(newValue);
    setSelectedOptions(selected);
    props.onChange && props.onChange(newValue, selected);
  };
  //istanbul ignore else
  const handleSearch = async (
    q: string,
    extraQuery: any,
    forceSearch = false,
    pageSizeQuery?: number
  ): Promise<ComplexOption[]> => {
    if (forceSearch || q.length >= minimumInputLength) {
      try {
        let list = [];
        if (!props.objectId) {
          return;
        }
        setLoading(true);
        const fieldsQuery = Array.isArray(fields.label)
          ? fields.label.map((label) => ({ [label]: { $like: `%${q}%` } }))
          : [{ [fields.label]: { $like: `%${q}%` } }];
        const data = await InstanceApi_postSearchV3(props.objectId, {
          query: {
            $and: [
              {
                $or: [
                  ...fieldsQuery,
                  ...extraSearchKey.map((key) => ({
                    [key]: { $like: `%${q}%` },
                  })),
                ],
              },

              ...extraQuery,
            ],
          },
          ...(permission ? { permission } : {}),
          fields: computeFields(),
          page: 1,
          page_size: pageSizeQuery || pageSize,
          ignore_missing_field_error: ignoreMissingFieldError,
          sort: props.sort,
        });

        list = data.list;
        setTotal(data.total);
        // 根据用户设置路径显示特定的 label 和 value
        const option = list.map((item) => ({
          ...item,
          label: Array.isArray(fields.label)
            ? fields.label.map((label) => get(item, label))
            : get(item, fields.label),
          value: get(item, fields.value),
          ...(props.objectId === "USER"
            ? {
                user_icon: get(item, "user_icon", "defaultIcon"),
              }
            : {}),
        }));
        setOptions(option);
        props.optionsChange?.(option, props.name);
        return option;
      } catch (e) {
        handleHttpError(e);
      } finally {
        setLoading(false);
      }
    }
  };
  const fetchInstanceData = async (): Promise<void> => {
    await handleSearch("", userQuery);
  };
  const getLabelOptions = (op: any) => {
    if (props.labelTemplate) {
      return parseTemplate(props.labelTemplate, op);
    } else {
      const label = op.label;
      if (Array.isArray(label)) {
        const firstKey = label[0];
        const resKey = label.slice(1, label.length).join(",");
        if (Array.isArray(firstKey) && props.showKeyField) {
          const subFirstKey = firstKey[0];
          const subResKey = firstKey.slice(1, firstKey.length).join(",");
          return subResKey && props.isMultiLabel
            ? `${subFirstKey}(${subResKey})`
            : subFirstKey ?? "";
        }
        return resKey && props.isMultiLabel
          ? `${firstKey ?? " - "}(${resKey})`
          : firstKey ?? "";
      } else {
        return label;
      }
    }
  };

  React.useEffect(() => {
    // 初始化时通过用户的 value 得出首次 label 的值
    // 由于value的不确定性，可能存在首次查询的值不唯一，初始化时也添加instanceQuery
    if (
      props.objectId &&
      !isNil(props.value) &&
      (!isEqual(props.objectId, objectId) || !isEqual(props.value, value))
    ) {
      (async () => {
        const option = await handleSearch(
          "",
          [
            {
              [fields.value || "instanceId"]: {
                $in: castArray(props.value),
              },
            },

            ...userQuery,
          ],
          true,
          props.value?.length >= pageSize ? props.value.length : pageSize
        );
        setSelectedOptions(option);
      })();
    }
    const _value =
      props.mode === "multiple" && !trim(props.value) ? [] : props.value;
    setValue(_value);
    setObjectId(props.objectId);
  }, [props.value, props.objectId]);

  React.useEffect(() => {
    if (!props.firstRender) {
      const resetVal: [] | "" = mode === "multiple" ? [] : "";
      setValue(resetVal);
    }
  }, [props.objectId]);
  //istanbul ignore else
  const debounceSearch = debounce(
    (q: string) => handleSearch(q, userQuery),
    500
  );

  return (
    <div
      className={style.formsCmdbInstSelectWrapper}
      style={{ width: props.inputBoxStyle?.width }}
    >
      <Spin spinning={loading}>
        <Select
          ref={ref}
          className="formsCmdbInstSelect"
          allowClear={allowClear}
          style={defaults(props.inputBoxStyle, { width: "100%" })}
          showSearch
          filterOption={false}
          value={value}
          mode={mode as ModeOption}
          placeholder={
            placeholder || i18n.t(`${NS_FORMS}:${K.BACKGROUND_SEARCH}`)
          }
          onChange={handleChange}
          onSearch={debounceSearch}
          onFocus={fetchInstanceData}
          disabled={props.disabled}
          dropdownStyle={{ padding: "2px", ...props.dropdownStyle }}
          dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
          dropdownRender={(menu) => {
            return (
              <div>
                {menu}
                {showSearchTip && total > pageSize && (
                  <div className={style.moreChoices}>
                    仅显示前{pageSize}项，更多结果请搜索
                  </div>
                )}
              </div>
            );
          }}
          {...(props.popoverPositionType === "parent"
            ? { getPopupContainer: (triggerNode) => triggerNode.parentElement }
            : {})}
        >
          {options.map((op, index) => {
            const optionLabel = getLabelOptions(op);
            return (
              <Select.Option key={index} value={op.value} label={optionLabel}>
                <Tooltip title={props.showTooltip ? optionLabel : undefined}>
                  <div className={classNames(style.optionDiv)}>
                    {op.user_icon && (
                      <span>
                        <Avatar
                          src={op.user_icon}
                          size={24}
                          className={classNames(style.avatar, {
                            [style.defaultIcon]: op.user_icon === "defaultIcon",
                          })}
                        >
                          {op.user_icon === "defaultIcon" &&
                            op.label?.slice(0, 2)}
                        </Avatar>
                      </span>
                    )}
                    <span
                      className={classNames(style.optionSpan)}
                      data-testid="option-label"
                    >
                      {optionLabel}
                    </span>
                    {suffix?.useBrick && (
                      <div className={style.suffixContainer}>
                        <BrickAsComponent
                          useBrick={suffix.useBrick}
                          data={op}
                        />
                      </div>
                    )}
                  </div>
                </Tooltip>
              </Select.Option>
            );
          })}
        </Select>
      </Spin>
    </div>
  );
}
export const RefCmdbInstanceSelectItem = React.forwardRef(
  CmdbInstanceSelectItem
);

export function CmdbInstanceSelect(
  props: CmdbInstanceSelectProps
): React.ReactElement {
  const selectRef = useRef<any>();
  const handleChange = (value: any, option: ComplexOption) => {
    Promise.resolve().then(() => {
      props.onChange?.(value, option);
    });
  };
  useEffect(() => {
    if (!isNil(props.useBrickVisible)) {
      Promise.resolve().then(() => {
        if (props.useBrickVisible) {
          selectRef.current.focus();
        } else {
          selectRef.current?.blur();
        }
      });
    }
  }, [props.useBrickVisible]);

  return (
    <FormItemWrapper {...props} className={style.formItemWrapper}>
      <RefCmdbInstanceSelectItem
        {...props}
        onChange={handleChange}
        ref={selectRef}
      ></RefCmdbInstanceSelectItem>
    </FormItemWrapper>
  );
}
