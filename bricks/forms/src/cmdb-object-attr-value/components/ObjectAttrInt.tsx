import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Form } from "@ant-design/compatible";
import { Input, Row, InputNumber } from "antd";
import { isNil } from "lodash";
import i18n from "i18next";

interface ObjectAttrIntProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface IntValueType {
  regex: string;
  default: number;
}

export function ObjectAttrInt(props: ObjectAttrIntProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
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
        {i18n.t(`${NS_FORMS}:${K.REGULAR}`)}
        <Row>
          <Input
            placeholder={i18n.t(`${NS_FORMS}:${K.THIS_IS_NOT_MANDATORY}`)}
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
