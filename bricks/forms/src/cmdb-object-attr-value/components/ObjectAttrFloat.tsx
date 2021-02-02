import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Form } from "@ant-design/compatible";
import { Input, Row, InputNumber, Alert } from "antd";
import { isNil } from "lodash";
import styles from "./index.module.css";

interface ObjectAttrFloatProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface FloatValueType {
  default: number;
}

export function ObjectAttrFloat(
  props: ObjectAttrFloatProps
): React.ReactElement {
  const [value, setValue] = React.useState<Partial<FloatValueType>>({
    default: "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<FloatValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      {/* <div>
        正则：
        <Row>
          <Input
            placeholder="可不填"
            value={value?.regex}
            onChange={(e) =>
              handleValueChange({ ...value, regex: e.target.value })
            }
          />
          <Alert
            message="^[\-|0-9]+(\.[0-9]{1,4})?$"
            type="info"
            className={styles.cmdbObjectAttrValueInfo}
          />
        </Row>
      </div> */}
      <div>
        属性默认值：
        <Row>
          <InputNumber
            value={value?.default}
            placeholder="小数点后最多可输入四位"
            style={{ width: "100%" }}
            step={0.0001}
            onChange={(e) => handleValueChange({ ...value, default: e })}
          />
        </Row>
      </div>
    </>
  );
}
