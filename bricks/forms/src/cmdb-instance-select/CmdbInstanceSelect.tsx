import React from "react";
import { Select, Spin, Avatar } from "antd";
import i18n from "i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { debounce, get, compact, castArray, defaults, isEqual } from "lodash";
import { handleHttpError } from "@next-core/brick-kit";
import { ModeOption } from "antd/lib/select";
import { InstanceApi } from "@sdk/cmdb-sdk";
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
  allowClear?: boolean;
  inputBoxStyle?: React.CSSProperties;
  extraSearchKey?: string[];
  popoverPositionType: "default" | "parent";
  isMultiLabel?: boolean;
  showSearchTip?: boolean;
  labelTemplate?: string;
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
    // 默认显示 label 为模型的 name/hostname, value 为 instanceId
    fields = {
      label: [getInstanceNameKey(props.objectId)],
      value: "instanceId",
    },
    minimumInputLength = 0,
    extraSearchKey = [],
    mode,
    placeholder,
    allowClear,
    pageSize,
    showSearchTip,
  } = props;
  const userQuery = formatUserQuery(props.instanceQuery);
  //istanbul ignore else
  if (!fields.value) {
    fields.value = "instanceId";
  }

  const [value, setValue] = React.useState();
  const [options, setOptions] = React.useState<ComplexOption[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const computeFields = () => {
    const fieldsLabels = Array.isArray(fields.label)
      ? Object.fromEntries(fields?.label.map((label) => [label, true]))
      : { [fields.label]: true };
    return {
      ...fieldsLabels,
      [fields.value]: true,
      ...(props.objectId === "USER"
        ? {
            user_icon: true,
          }
        : {}),
      ...extraSearchKey.reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {} as any),
    };
  };

  const handleChange = (newValue: any): void => {
    setValue(newValue);
    const selected = options.find((item) => item.value === newValue);
    props.onChange && props.onChange(newValue, selected);
  };
  //istanbul ignore else
  const handleSearch = async (
    q: string,
    extraQuery: any,
    forceSearch = false
  ): Promise<void> => {
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
        const data = await InstanceApi.postSearch(props.objectId, {
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
          fields: computeFields(),
          page_size: pageSize,
        });
        list = data.list;
        setTotal(data.total);
        // 根据用户设置路径显示特定的 label 和 value
        setOptions(
          list.map((item) => ({
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
          }))
        );
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
        return resKey && props.isMultiLabel
          ? `${firstKey}(${resKey})`
          : firstKey ?? "";
      } else {
        return label;
      }
    }
  };

  React.useEffect(() => {
    // 初始化时通过用户的 value 得出首次 label 的值
    if (!isEqual(props.value, value) && props.value !== undefined) {
      handleSearch(
        "",
        [
          {
            [fields.value || "instanceId"]: {
              $in: castArray(props.value),
            },
          },
        ],
        true
      );
    }
    setValue(props.value);
  }, [props.value]);

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
    <Spin spinning={loading}>
      <Select
        ref={ref}
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
        optionLabelProp="label"
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
        {options.map((op) => {
          const optionLabel = getLabelOptions(op);
          return (
            <Select.Option key={op.value} value={op.value} label={optionLabel}>
              {op.user_icon && (
                <Avatar
                  src={op.user_icon}
                  size={24}
                  className={classNames(style.avatar, {
                    [style.defaultIcon]: op.user_icon === "defaultIcon",
                  })}
                >
                  {op.user_icon === "defaultIcon" && op.label?.slice(0, 2)}
                </Avatar>
              )}
              {optionLabel}
            </Select.Option>
          );
        })}
      </Select>
    </Spin>
  );
}
export const RefCmdbInstanceSelectItem = React.forwardRef(
  CmdbInstanceSelectItem
);
export function CmdbInstanceSelect(
  props: CmdbInstanceSelectProps
): React.ReactElement {
  const handleChange = (value: any, option: ComplexOption) => {
    Promise.resolve().then(() => {
      props.onChange?.(value, option);
    });
  };
  return (
    <FormItemWrapper {...props}>
      <RefCmdbInstanceSelectItem
        {...props}
        onChange={handleChange}
      ></RefCmdbInstanceSelectItem>
    </FormItemWrapper>
  );
}
