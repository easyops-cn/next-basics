import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Alert } from "antd";
import { isNil } from "lodash";
import styles from "./index.module.css";

interface ObjectAttrIPProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface IntValueType {
  default: string;
}

export function ObjectAttrIP(props: ObjectAttrIPProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<Partial<IntValueType>>({
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
          <Alert
            message="^^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$"
            type="info"
            className={styles.cmdbObjectAttrValueInfo}
          />
        </Row>
      </div>
      <div>
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          <Input
            value={value?.default}
            style={{ width: "100%" }}
            onChange={(e) =>
              handleValueChange({ ...value, default: e.target.value })
            }
          />
        </Row>
      </div>
    </>
  );
}
