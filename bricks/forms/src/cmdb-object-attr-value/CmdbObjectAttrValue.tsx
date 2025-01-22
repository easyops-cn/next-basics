import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { Select, Input, Row, Col, Radio, Empty } from "antd";
import { defaults, isEmpty, compact } from "lodash";
import { getRuntime } from "@next-core/brick-kit";
import i18n from "i18next";
import {
  ObjectAttrStr,
  ObjectAttrInt,
  ObjectAttrFloat,
  ObjectAttrDate,
  ObjectAttrDatetime,
  ObjectAttrEnum,
  ObjectAttrArr,
  ObjectAttrBool,
  ObjectAttrIP,
  ObjectAttrJson,
  ObjectAttrStruct,
} from "./components";
import styles from "./components/index.module.css";
const Option = Select.Option;

export const ValueTypeMap = {
  str: "字符型",
  int: "整型",
  date: "日期",
  datetime: "时间",
  enum: "枚举型",
  enums: "多选枚举型",
  arr: "数组",
  struct: "结构体（只可添加一行信息）",
  structs: "结构体数组（可添加多行信息，原名",
  ip: "IP",
  bool: "布尔型",
  float: "浮点型",
  json: "JSON",
  attachment: "附件",
} as const;

export const defaultValue = {
  default: "",
};

const FLAGS = getRuntime().getFeatureFlags();

export const defaultValueMap = new Map([
  [
    "str",
    {
      default: "",
      mode: "default",
      default_type: "value",
    },
  ],
  ["int", defaultValue],
  ["date", defaultValue],
  ["datetime", defaultValue],
  [
    "enum",
    {
      default: "",
      regex: [],
    },
  ],
  [
    "enums",
    {
      default: [],
      regex: [],
    },
  ],
  [
    "arr",
    {
      default: [],
      mode: "default",
    },
  ],
  [
    "struct",
    {
      default: "",
      struct_define: [],
    },
  ],
  [
    "structs",
    {
      default: "",
      struct_define: [],
    },
  ],
  ["ip", defaultValue],
  ["bool", defaultValue],
  ["float", defaultValue],
  ["json", defaultValue],
  [
    "attachment",
    {
      default: "",
      struct_define: [],
      mode: "attachment",
    },
  ],
]);

export type ValueType = keyof typeof ValueTypeMap;

export interface ValueOptions {
  key: string;
  text: string;
}
export const valueTypeList = compact([
  {
    key: "str",
    text: i18n.t(`${NS_FORMS}:${K.STRING_TYPE}`),
  },
  {
    key: "int",
    text: i18n.t(`${NS_FORMS}:${K.INTEGER}`),
  },
  {
    key: "date",
    text: i18n.t(`${NS_FORMS}:${K.DATE}`),
  },
  {
    key: "datetime",
    text: i18n.t(`${NS_FORMS}:${K.TIME}`),
  },
  {
    key: "enum",
    text: i18n.t(`${NS_FORMS}:${K.ENUMERATION}`),
  },
  {
    key: "enums",
    text: i18n.t(`${NS_FORMS}:${K.ENUMS}`),
  },
  {
    key: "arr",
    text: i18n.t(`${NS_FORMS}:${K.ARRAY}`),
  },
  {
    key: "struct",
    text: i18n.t(`${NS_FORMS}:${K.STRUCTURE_ONE_LINE}`),
  },
  {
    key: "structs",
    text: i18n.t(`${NS_FORMS}:${K.STRUCTURE_MULTIPLE_LINES}`),
  },
  {
    key: "ip",
    text: "IP",
  },
  {
    key: "bool",
    text: i18n.t(`${NS_FORMS}:${K.BOOLEAN}`),
  },
  {
    key: "float",
    text: i18n.t(`${NS_FORMS}:${K.FLOAT}`),
  },
  {
    key: "json",
    text: "JSON",
  },
  FLAGS["cmdb-use-attr-attachment"] && {
    key: "attachment",
    text: i18n.t(`${NS_FORMS}:${K.ATTACHMENT}`),
  },
]);

export interface CmdbObjectAttrValueProps extends FormItemWrapperProps {
  value?: any;
  valueType?: ValueType[];
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: any) => void;
  disabled?: boolean;
  disableProtectedAttr?: boolean;
  isProtected?: boolean;
}

export function CmdbObjectAttrValueItem(
  props: CmdbObjectAttrValueProps,
  ref: any
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [valueType, setValueType] = React.useState();
  const [valueOptions, setValueOptions] =
    React.useState<ValueOptions[]>(valueTypeList);
  const { placeholder, inputBoxStyle, isProtected, disableProtectedAttr } =
    props;
  const [value, setValue] = React.useState();
  const [attrDisabled, setAttrDisabled] = React.useState(
    isProtected && disableProtectedAttr
  );
  React.useEffect(() => {
    setValueType(props.value?.type);
    setValue(props.value);
  }, [props.value]);

  React.useEffect(() => {
    props.valueType?.length > 0 &&
      setValueOptions(
        valueTypeList.filter((valueType) =>
          props.valueType?.includes(valueType.key)
        )
      );
  }, [props.valueType]);
  React.useEffect(() => {
    setAttrDisabled(isProtected && disableProtectedAttr);
  }, [isProtected]);
  const onValueChange = (newValue?: any) => {
    if (!newValue.type) {
      props.onChange && props.onChange({ ...value, ...newValue });
    } else {
      props.onChange && props.onChange(newValue);
    }
  };

  const handleValueTypeChange = (valueType: ValueType): void => {
    setValueType(valueType);
    setValue({
      ...defaultValueMap.get(valueType),
      type: valueType,
    });
    onValueChange({
      ...defaultValueMap.get(valueType),
      type: valueType,
    });
  };

  const getContentByValueType = (): React.ReactElement => {
    switch (valueType) {
      case "str":
        return (
          <ObjectAttrStr
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "int":
        return (
          <ObjectAttrInt
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "date":
        return (
          <ObjectAttrDate
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "datetime":
        return (
          <ObjectAttrDatetime
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "enum":
        return (
          <ObjectAttrEnum
            value={value}
            onChange={onValueChange}
            isMulti={false}
            disabled={attrDisabled}
          />
        );
      case "enums":
        return (
          <ObjectAttrEnum
            value={value}
            onChange={onValueChange}
            isMulti={true}
            disabled={attrDisabled}
          />
        );
      case "arr":
        return (
          <ObjectAttrArr
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "struct":
        return (
          <ObjectAttrStruct
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "structs":
        return (
          <ObjectAttrStruct
            value={value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "bool":
        return (
          <ObjectAttrBool
            value={props.value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "float":
        return (
          <ObjectAttrFloat
            value={props.value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "ip":
        return (
          <ObjectAttrIP
            value={props.value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      case "json":
        return (
          <ObjectAttrJson
            value={props.value}
            onChange={onValueChange}
            disabled={attrDisabled}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div ref={ref}>
      <Select
        style={defaults(inputBoxStyle, { width: "100%" })}
        className={
          valueType !== "attachment" && value ? styles.typeSelected : ""
        }
        placeholder={placeholder || t(K.PLEASE_SELECT_VALUE_TYPE)}
        value={valueType}
        onChange={handleValueTypeChange}
        disabled={props.disabled}
      >
        {valueOptions.map((option) => (
          <Option value={option.key} key={option.key}>
            {option.text}
          </Option>
        ))}
      </Select>
      {getContentByValueType()}
    </div>
  );
}

export const RefCmdbObjectAttrValueItem = React.forwardRef(
  CmdbObjectAttrValueItem
);

export function CmdbObjectAttrValue(
  props: CmdbObjectAttrValueProps
): React.ReactElement {
  const handleChange = (value: any) => {
    Promise.resolve().then(() => {
      props.onChange?.(value);
    });
  };
  return (
    <FormItemWrapper {...props}>
      <RefCmdbObjectAttrValueItem {...props} onChange={handleChange} />
    </FormItemWrapper>
  );
}
