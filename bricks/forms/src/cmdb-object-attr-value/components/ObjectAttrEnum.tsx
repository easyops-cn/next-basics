import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Select } from "antd";
import styles from "./index.module.css";
import { isNil } from "lodash";
import i18n from "i18next";
const Option = Select.Option;

interface ObjectAttrIntProps {
  value: any;
  onChange: (newValue?: any) => void;
  isMulti?: boolean;
  disabled?: boolean;
}

interface EnumValueType {
  regex: [];
  default: string | string[];
}

export function ObjectAttrEnum(props: ObjectAttrIntProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
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
      <div className={styles.typeSelected}>
        {i18n.t(`${NS_FORMS}:${K.ENUMERATION_VALUE}`)}
        <Row>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            value={value?.regex || undefined}
            placeholder={i18n.t(
              `${NS_FORMS}:${K.PLEASE_INPUT_ENUMERATED_VALUE}`
            )}
            onChange={(e) => handleValueChange({ ...value, regex: e })}
            disabled={props.disabled}
          />
        </Row>
      </div>
      <div>
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          <Select
            style={{ width: "100%" }}
            value={getDefaultEnumValue()}
            mode={props.isMulti ? "multiple" : ""}
            allowClear
            disabled={props.disabled}
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
