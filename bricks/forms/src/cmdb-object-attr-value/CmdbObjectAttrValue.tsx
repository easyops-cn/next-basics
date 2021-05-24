import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../i18n/constants";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { Select, Input, Row, Col, Radio, Empty } from "antd";
import { defaults, isEmpty } from "lodash";
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
} as const;

export const defaultValue = {
  default: "",
};

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
]);

export type ValueType = keyof typeof ValueTypeMap;

export interface ValueOptions {
  key: string;
  text: string;
}
export const valueTypeList = [
  {
    key: "str",
    text: i18n.t(`${NS_FORMS}:${K.STRING_TYPE}`),
  },
  {
    key: "int",
    text: "整型",
  },
  {
    key: "date",
    text: "日期",
  },
  {
    key: "datetime",
    text: "时间",
  },
  {
    key: "enum",
    text: "枚举型(单选)",
  },
  {
    key: "enums",
    text: "多选枚举型",
  },
  {
    key: "arr",
    text: "数组",
  },
  {
    key: "struct",
    text: "结构体（只可添加一行信息）",
  },
  {
    key: "structs",
    text: "结构体数组（可添加多行信息，原名'结构体'）",
  },
  {
    key: "ip",
    text: "IP",
  },
  {
    key: "bool",
    text: "布尔型",
  },
  {
    key: "float",
    text: "浮点型",
  },
  {
    key: "json",
    text: "JSON",
  },
];

export interface CmdbObjectAttrValueProps extends FormItemWrapperProps {
  value?: any;
  valueType?: ValueType[];
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export function CmdbObjectAttrValueItem(
  props: CmdbObjectAttrValueProps,
  ref: any
): React.ReactElement {
  const [valueType, setValueType] = React.useState();
  const [valueOptions, setValueOptions] = React.useState<ValueOptions[]>(
    valueTypeList
  );
  const { placeholder, inputBoxStyle } = props;
  const [value, setValue] = React.useState();

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
        return <ObjectAttrStr value={value} onChange={onValueChange} />;
      case "int":
        return <ObjectAttrInt value={value} onChange={onValueChange} />;
      case "date":
        return <ObjectAttrDate value={value} onChange={onValueChange} />;
      case "datetime":
        return <ObjectAttrDatetime value={value} onChange={onValueChange} />;
      case "enum":
        return <ObjectAttrEnum value={value} onChange={onValueChange} />;
      case "enums":
        return (
          <ObjectAttrEnum
            value={value}
            onChange={onValueChange}
            isMulti={true}
          />
        );
      case "arr":
        return <ObjectAttrArr value={value} onChange={onValueChange} />;
      case "struct":
        return <ObjectAttrStruct value={value} onChange={onValueChange} />;
      case "structs":
        return <ObjectAttrStruct value={value} onChange={onValueChange} />;
      case "bool":
        return <ObjectAttrBool value={props.value} onChange={onValueChange} />;
      case "float":
        return <ObjectAttrFloat value={props.value} onChange={onValueChange} />;
      case "ip":
        return <ObjectAttrIP value={props.value} onChange={onValueChange} />;
      case "json":
        return <ObjectAttrJson value={props.value} onChange={onValueChange} />;
      default:
        return <></>;
    }
  };

  return (
    <div ref={ref}>
      <Select
        style={defaults(inputBoxStyle, { width: "100%" })}
        placeholder={placeholder || "请选择值类型"}
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
