import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Row, Select } from "antd";
import { isNil, toString } from "lodash";

interface ObjectAttrBoolProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface BoolValueType {
  default: boolean;
}

export function ObjectAttrBool(props: ObjectAttrBoolProps): React.ReactElement {
  const [value, setValue] = React.useState<BoolValueType>({
    default: undefined,
  });
  const { t } = useTranslation(NS_FORMS);
  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: BoolValueType) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          <Select
            allowClear
            value={toString(value?.default)}
            style={{ width: "100%" }}
            onChange={(e) =>
              handleValueChange({
                ...value,
                default: e === "true" ? true : e === "false" ? false : null,
              })
            }
          >
            <Select.Option key={0} value="true">
              true
            </Select.Option>
            <Select.Option key={1} value="false">
              false
            </Select.Option>
          </Select>
        </Row>
      </div>
    </>
  );
}
