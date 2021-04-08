import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Select } from "antd";
import { isNil } from "lodash";

const Option = Select.Option;

interface ObjectAttrIntProps {
  value: any;
  onChange: (newValue?: any) => void;
  isMulti?: boolean;
}

interface EnumValueType {
  regex: [];
  default: string | string[];
}

export function ObjectAttrEnum(props: ObjectAttrIntProps): React.ReactElement {
  const [value, setValue] = React.useState<Partial<EnumValueType>>({
    regex: [],
    default: props.isMulti ? [] : "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value, props.isMulti]);

  const handleValueChange = (value: Partial<EnumValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const getDefaultEnumValue = () => {
    if (props.isMulti) {
      return Array.isArray(value?.default)
        ? (value.default as string[])?.filter((i) => value.regex.includes(i))
        : undefined;
    } else {
      return value.regex?.includes(value?.default) ? value?.default : "";
    }
  };

  return (
    <>
      <div>
        枚举值：
        <Row>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            value={value?.regex}
            placeholder="输入枚举值，以回车间隔"
            onChange={(e) => handleValueChange({ ...value, regex: e })}
          />
        </Row>
      </div>
      <div>
        属性默认值：
        <Row>
          <Select
            style={{ width: "100%" }}
            value={getDefaultEnumValue()}
            mode={props.isMulti ? "multiple" : ""}
            allowClear
            onChange={(e) => handleValueChange({ ...value, default: e || "" })}
          >
            {value?.regex?.map((d) => (
              <Option key={d} value={d}>
                {d}
              </Option>
            ))}
          </Select>
        </Row>
      </div>
    </>
  );
}
