import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Alert } from "antd";
import { isNil } from "lodash";
import i18n from "i18next";
interface ObjectAttrJsonProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface JsonValueType {
  default: string;
  regex: string;
}

export function ObjectAttrJson(props: ObjectAttrJsonProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<Partial<JsonValueType>>({
    default: "",
    regex: "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<JsonValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        JSON Schema：
        <Row>
          <Input
            placeholder={i18n.t(`${NS_FORMS}:${K.FLOAT_LIMIT}`)}
            value={value?.regex}
            onChange={(e) =>
              handleValueChange({ ...value, regex: e.target.value })
            }
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
