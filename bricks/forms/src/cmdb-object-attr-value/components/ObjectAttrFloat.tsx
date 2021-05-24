import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Form } from "@ant-design/compatible";
import { Input, Row, InputNumber, Alert } from "antd";
import { isNil } from "lodash";
import styles from "./index.module.css";
import i18n from "i18next";
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
  const { t } = useTranslation(NS_FORMS);
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
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          <InputNumber
            value={value?.default}
            placeholder={i18n.t(`${NS_FORMS}:${K.FLOAT_LIMIT}`)}
            style={{ width: "100%" }}
            step={0.0001}
            onChange={(e) => handleValueChange({ ...value, default: e })}
          />
        </Row>
      </div>
    </>
  );
}
