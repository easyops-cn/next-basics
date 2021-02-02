import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Form } from "@ant-design/compatible";
import { Input, Row, InputNumber } from "antd";
import { isNil } from "lodash";

interface ObjectAttrIntProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface IntValueType {
  regex: string;
  default: number;
}

export function ObjectAttrInt(props: ObjectAttrIntProps): React.ReactElement {
  const [value, setValue] = React.useState<Partial<IntValueType>>({
    regex: "",
    default: "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<IntValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        正则：
        <Row>
          <Input
            placeholder="可不填"
            value={value?.regex}
            onChange={(e) =>
              handleValueChange({ ...value, regex: e.target.value })
            }
          />
        </Row>
      </div>
      <div>
        属性默认值：
        <Row>
          <InputNumber
            value={value?.default}
            style={{ width: "100%" }}
            onChange={(e) => handleValueChange({ ...value, default: e })}
          />
        </Row>
      </div>
    </>
  );
}
